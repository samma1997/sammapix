"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * OutRun-style pseudo-3D racer — Chrome Dino monochrome palette.
 * Based on segment projection math from jakesgordon/javascript-racer (MIT).
 * Pure Canvas 2D, zero images, zero deps.
 */

const W = 600, H = 200;
const SEG_LEN = 200;
const RUMBLE = 3;
const ROAD_W = 2000;
const LANES = 3;
const FOV = 100;
const CAM_H = 1000;
const DRAW = 100;
const FPS = 60;
const STEP = 1 / FPS;

// Chrome Dino palette
const DARK = {
  road: "#535353", grass: "#c8c8c8", rumble: "#535353", lane: "#535353",
};
const LIGHT = {
  road: "#6b6b6b", grass: "#d8d8d8", rumble: "#d8d8d8", lane: "#6b6b6b",
};
const BG = "#f7f7f7";
const TXT = "#535353";

interface Seg {
  i: number;
  p1: { w: { y: number; z: number }; s: { x: number; y: number; w: number; s: number } };
  p2: { w: { y: number; z: number }; s: { x: number; y: number; w: number; s: number } };
  curve: number;
  dark: boolean;
  clip: number;
  cars: { offset: number; z: number; speed: number }[];
}

function easeIn(a: number, b: number, p: number) { return a + (b - a) * (p * p); }
function easeInOut(a: number, b: number, p: number) { return a + (b - a) * ((-Math.cos(p * Math.PI) / 2) + 0.5); }
function limit(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function pctRem(z: number) { return (z % SEG_LEN) / SEG_LEN; }
function interp(a: number, b: number, p: number) { return a + (b - a) * p; }
function overlap(x1: number, w1: number, x2: number, w2: number) {
  const hw1 = w1 / 2, hw2 = w2 / 2;
  return !((x1 + hw1) < (x2 - hw2) || (x1 - hw1) > (x2 + hw2));
}

function buildRoad(): Seg[] {
  const segs: Seg[] = [];
  let lastY = 0;

  function add(curve: number, y: number) {
    const n = segs.length;
    segs.push({
      i: n,
      p1: { w: { y: lastY, z: n * SEG_LEN }, s: { x: 0, y: 0, w: 0, s: 0 } },
      p2: { w: { y: y, z: (n + 1) * SEG_LEN }, s: { x: 0, y: 0, w: 0, s: 0 } },
      curve,
      dark: Math.floor(n / RUMBLE) % 2 === 0,
      clip: 0,
      cars: [],
    });
    lastY = y;
  }

  function road(enter: number, hold: number, leave: number, c: number, h: number) {
    const startY = lastY;
    const endY = startY + h * SEG_LEN;
    const total = enter + hold + leave;
    for (let n = 0; n < enter; n++) add(easeIn(0, c, n / enter), easeInOut(startY, endY, n / total));
    for (let n = 0; n < hold; n++) add(c, easeInOut(startY, endY, (enter + n) / total));
    for (let n = 0; n < leave; n++) add(easeInOut(c, 0, n / leave), easeInOut(startY, endY, (enter + hold + n) / total));
  }

  road(50, 50, 50, 0, 0); // straight
  road(25, 25, 25, 0, 20); // hill
  road(25, 25, 25, -3, 0); // left curve
  road(50, 50, 50, 4, 30); // big right + hill
  road(25, 25, 25, 0, -30); // downhill
  road(30, 30, 30, -4, 0); // sharp left
  road(50, 50, 50, 2, 15); // gentle right + hill
  road(25, 25, 25, 0, -25); // drop
  road(50, 50, 50, -2, 10); // curve
  road(25, 25, 25, 0, 0); // flat
  road(30, 30, 30, 3, 20); // curve + hill
  road(100, 100, 100, 0, -(lastY / SEG_LEN)); // back to ground

  // Add AI cars
  for (let n = 0; n < 40; n++) {
    const idx = Math.floor(Math.random() * segs.length);
    segs[idx].cars.push({
      offset: Math.random() * 1.6 - 0.8,
      z: idx * SEG_LEN,
      speed: (SEG_LEN / STEP) * (0.2 + Math.random() * 0.3),
    });
  }

  return segs;
}

function proj(p: { w: { y: number; z: number }; s: { x: number; y: number; w: number; s: number } }, cx: number, cy: number, cz: number, depth: number) {
  const tz = p.w.z - cz;
  if (tz <= 0) { p.s.s = 0; return; }
  p.s.s = depth / tz;
  p.s.x = W / 2 + p.s.s * (0 - cx) * W / 2;
  p.s.y = H / 2 - p.s.s * (p.w.y - cy) * H / 2;
  p.s.w = p.s.s * ROAD_W * W / 2;
}

function poly(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, col: string) {
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath();
  ctx.fill();
}

function drawPixelCar(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, isPlayer: boolean) {
  const w = isPlayer ? 26 : Math.max(6, 50 * scale);
  const h = w * 0.55;
  ctx.fillStyle = TXT;
  ctx.fillRect(x - w / 2, y - h, w, h);
  ctx.fillStyle = BG;
  ctx.fillRect(x - w * 0.3, y - h, w * 0.6, h * 0.3);
  if (isPlayer) {
    ctx.fillStyle = "#333";
    ctx.fillRect(x - w / 2 - 3, y - h * 0.3, 3, h * 0.4);
    ctx.fillRect(x + w / 2, y - h * 0.3, 3, h * 0.4);
    ctx.fillRect(x - w / 2 - 3, y - h * 0.8, 3, h * 0.4);
    ctx.fillRect(x + w / 2, y - h * 0.8, 3, h * 0.4);
  }
}

export default function MiniGame({ className }: { className?: string }) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const keys = useRef(new Set<string>());
  const [phase, setPhase] = useState<"idle" | "play" | "dead">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const start = useCallback(() => setPhase("play"), []);
  const tap = useCallback(() => { if (phase !== "play") start(); }, [phase, start]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      keys.current.add(e.key);
      if ([" ", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        if (phase !== "play") start();
      }
    };
    const ku = (e: KeyboardEvent) => keys.current.delete(e.key);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, [phase, start]);

  useEffect(() => {
    if (phase !== "play") return;
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const segs = buildRoad();
    const trackLen = segs.length * SEG_LEN;
    const depth = 1 / Math.tan((FOV / 2) * Math.PI / 180);
    const playerZ = CAM_H * depth;
    const maxSpeed = SEG_LEN / STEP;

    let pos = 0, speed = 0, playerX = 0;
    let alive = true, raf = 0, sc = 0;

    function findSeg(z: number) { return segs[Math.floor(z / SEG_LEN) % segs.length]; }

    function loop() {
      if (!alive) return;
      const k = keys.current;

      // Update
      speed = Math.min(speed + maxSpeed * 0.4 * STEP, maxSpeed);
      if (k.has("ArrowLeft") || k.has("a")) playerX -= 0.04;
      if (k.has("ArrowRight") || k.has("d")) playerX += 0.04;

      pos += speed * STEP;
      if (pos >= trackLen) pos -= trackLen;

      const pSeg = findSeg(pos + playerZ);
      playerX -= pSeg.curve * (speed / maxSpeed) * 0.006;
      playerX = limit(playerX, -2, 2);

      if (Math.abs(playerX) > 1) speed *= 0.98;

      sc = Math.floor(pos / 100);
      setScore(sc);

      // Update AI cars
      for (const s of segs) {
        for (const car of s.cars) {
          car.z += car.speed * STEP;
          if (car.z >= trackLen) car.z -= trackLen;
        }
      }

      // Collision
      const pw = 0.15;
      for (const car of pSeg.cars) {
        if (overlap(playerX, pw * 2, car.offset, 0.2)) {
          alive = false;
          setPhase("dead");
          setBest(b => Math.max(b, sc));
          cancelAnimationFrame(raf);
          return;
        }
      }

      // Render
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Hills
      ctx.fillStyle = "#ddd";
      ctx.beginPath();
      ctx.moveTo(0, H * 0.38);
      for (let x = 0; x <= W; x += 10) {
        ctx.lineTo(x, H * 0.35 + Math.sin(x * 0.015 + pos * 0.0001) * 8 + Math.sin(x * 0.007) * 12);
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();

      const baseSeg = findSeg(pos);
      const basePct = pctRem(pos);
      const playerY = interp(pSeg.p1.w.y, pSeg.p2.w.y, pctRem(pos + playerZ));
      let maxY = H;
      let x = 0, dx = -(baseSeg.curve * basePct);

      // Project segments
      for (let n = 0; n < DRAW; n++) {
        const seg = segs[(baseSeg.i + n) % segs.length];
        const looped = seg.i < baseSeg.i;
        seg.clip = maxY;

        proj(seg.p1, (playerX * ROAD_W) - x, playerY + CAM_H, pos - (looped ? trackLen : 0), depth);
        proj(seg.p2, (playerX * ROAD_W) - x - dx, playerY + CAM_H, pos - (looped ? trackLen : 0), depth);

        x += dx;
        dx += seg.curve;

        if (seg.p1.s.s <= 0 || seg.p2.s.y >= seg.p1.s.y || seg.p2.s.y >= maxY) continue;

        const c = seg.dark ? DARK : LIGHT;
        const p1 = seg.p1.s, p2 = seg.p2.s;

        // Grass
        poly(ctx, 0, p2.y, W, p2.y, W, p1.y, 0, p1.y, c.grass);
        // Road
        poly(ctx, p1.x - p1.w, p1.y, p1.x + p1.w, p1.y, p2.x + p2.w, p2.y, p2.x - p2.w, p2.y, c.road);
        // Rumble L
        const rw1 = p1.w * 0.08, rw2 = p2.w * 0.08;
        poly(ctx, p1.x - p1.w - rw1, p1.y, p1.x - p1.w, p1.y, p2.x - p2.w, p2.y, p2.x - p2.w - rw2, p2.y, c.rumble);
        // Rumble R
        poly(ctx, p1.x + p1.w, p1.y, p1.x + p1.w + rw1, p1.y, p2.x + p2.w + rw2, p2.y, p2.x + p2.w, p2.y, c.rumble);
        // Lane
        if (seg.dark) {
          const lw1 = p1.w * 0.01, lw2 = p2.w * 0.01;
          for (let l = 1; l < LANES; l++) {
            const lx1 = p1.x - p1.w + (p1.w * 2 * l / LANES);
            const lx2 = p2.x - p2.w + (p2.w * 2 * l / LANES);
            poly(ctx, lx1 - lw1, p1.y, lx1 + lw1, p1.y, lx2 + lw2, p2.y, lx2 - lw2, p2.y, c.lane);
          }
        }

        maxY = p1.y;
      }

      // Draw AI cars & obstacles (back to front)
      for (let n = DRAW - 1; n > 0; n--) {
        const seg = segs[(baseSeg.i + n) % segs.length];
        for (const car of seg.cars) {
          const pct = pctRem(car.z);
          const sx = interp(seg.p1.s.x, seg.p2.s.x, pct) + (interp(seg.p1.s.s, seg.p2.s.s, pct) * car.offset * ROAD_W * W / 2);
          const sy = interp(seg.p1.s.y, seg.p2.s.y, pct);
          const ss = interp(seg.p1.s.s, seg.p2.s.s, pct);
          if (sy < seg.clip && ss > 0.001) {
            drawPixelCar(ctx, sx, sy, ss, false);
          }
        }
      }

      // Player car
      drawPixelCar(ctx, W / 2, H - 10, 1, true);

      // HUD
      ctx.fillStyle = TXT;
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`${sc}m`, 8, 14);
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round((speed / maxSpeed) * 280)} km/h`, W - 8, 14);

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [phase]);

  // Idle/dead screen
  useEffect(() => {
    if (phase === "play") return;
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // Static road perspective
    ctx.fillStyle = "#ddd";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.4);
    for (let x = 0; x <= W; x += 10) ctx.lineTo(x, H * 0.38 + Math.sin(x * 0.01) * 10);
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();

    ctx.fillStyle = DARK.road;
    ctx.beginPath();
    ctx.moveTo(W * 0.25, H); ctx.lineTo(W * 0.75, H);
    ctx.lineTo(W * 0.53, H * 0.42); ctx.lineTo(W * 0.47, H * 0.42);
    ctx.closePath(); ctx.fill();

    // Dashed center line
    for (let y = H; y > H * 0.42; y -= 12) {
      const p = (y - H * 0.42) / (H - H * 0.42);
      const lw = 1 + p * 2;
      ctx.fillStyle = LIGHT.lane;
      ctx.fillRect(W / 2 - lw / 2, y - 4, lw, 4);
    }

    drawPixelCar(ctx, W / 2, H - 10, 1, true);

    ctx.fillStyle = TXT;
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    if (phase === "dead") {
      ctx.fillText(`GAME OVER — ${score}m`, W / 2, H * 0.22);
      ctx.font = "10px monospace";
      ctx.fillStyle = "#999";
      if (best > 0) ctx.fillText(`Best: ${best}m`, W / 2, H * 0.22 + 16);
      ctx.fillText("SPACE or tap to retry", W / 2, H * 0.22 + 32);
    } else {
      ctx.fillText("OUTRUN", W / 2, H * 0.2);
      ctx.font = "10px monospace";
      ctx.fillStyle = "#999";
      ctx.fillText("SPACE to play · arrows to steer", W / 2, H * 0.2 + 18);
    }
  }, [phase, score, best]);

  return (
    <canvas
      ref={cvs}
      width={W}
      height={H}
      onClick={tap}
      onTouchStart={(e) => {
        if (phase !== "play") { tap(); return; }
        const r = cvs.current?.getBoundingClientRect();
        if (!r) return;
        const tx = e.touches[0].clientX - r.left;
        const key = tx < r.width / 2 ? "ArrowLeft" : "ArrowRight";
        keys.current.add(key);
        setTimeout(() => keys.current.delete(key), 120);
      }}
      className={className}
      style={{ width: "100%", maxWidth: 600, height: "auto", display: "block", margin: "0 auto", cursor: "pointer", borderRadius: 6 }}
      tabIndex={0}
      aria-label="OutRun racing mini-game"
    />
  );
}
