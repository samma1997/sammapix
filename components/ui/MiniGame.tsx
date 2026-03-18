"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * OutRun-style pseudo-3D racing mini-game.
 * Chrome Dino color palette (dark gray on white) with pseudo-3D road perspective.
 * Pure Canvas 2D — zero dependencies, ~12KB source.
 */

// ─── Palette (Chrome Dino style: monochrome) ─────────────────────────────────
const C = {
  bg: "#f7f7f7",
  sky: "#f7f7f7",
  road: "#535353",
  roadLight: "#6b6b6b",
  grass: "#d4d4d4",
  grassLight: "#e5e5e5",
  rumble: "#535353",
  rumbleLight: "#f7f7f7",
  lane: "#e5e5e5",
  car: "#535353",
  carAccent: "#737373",
  obstacle: "#535353",
  text: "#535353",
  score: "#535353",
  hill: "#c4c4c4",
};

// ─── Game constants ──────────────────────────────────────────────────────────
const W = 600;
const H = 200;
const ROAD_W = 2000; // road width in world units
const SEG_LEN = 200; // segment length
const DRAW_DIST = 150; // how many segments ahead to draw
const CAM_HEIGHT = 1000;
const CAM_DEPTH = 1 / Math.tan((80 / 2) * (Math.PI / 180)); // FOV 80°
const PLAYER_Z = CAM_HEIGHT * CAM_DEPTH;
const LANES = 3;

interface Segment {
  z: number;
  curve: number;
  y: number; // hill
  hasObstacle: boolean;
  obstacleLane: number; // -1, 0, or 1
  clip: number;
}

interface GameState {
  pos: number; // player Z position in world
  speed: number;
  maxSpeed: number;
  playerX: number; // -1 to 1
  targetX: number;
  score: number;
  alive: boolean;
  segments: Segment[];
  frameCount: number;
}

function buildTrack(length: number): Segment[] {
  const segs: Segment[] = [];
  for (let i = 0; i < length; i++) {
    const curve =
      i > 50 && i < 100 ? 2 :
      i > 150 && i < 250 ? -3 :
      i > 300 && i < 380 ? 4 :
      i > 400 && i < 500 ? -2 :
      (Math.sin(i * 0.02) * 2);
    const y = Math.sin(i * 0.01) * 1500;

    // Obstacles every ~30 segments after warmup
    const hasObstacle = i > 30 && i % 25 === 0;
    const obstacleLane = hasObstacle ? (Math.floor(Math.random() * 3) - 1) : 0;

    segs.push({ z: i * SEG_LEN, curve, y, hasObstacle, obstacleLane, clip: 0 });
  }
  return segs;
}

function project(
  pX: number, pY: number, pZ: number,
  camX: number, camY: number, camZ: number,
  screenW: number, screenH: number
) {
  const tx = pX - camX;
  const ty = pY - camY;
  const tz = pZ - camZ;
  const scale = tz > 0 ? CAM_DEPTH / tz : 0;
  const sx = screenW / 2 + scale * tx * screenW / 2;
  const sy = screenH / 2 - scale * ty * screenH / 2;
  const sw = scale * ROAD_W * screenW / 2;
  return { sx, sy, sw, scale };
}

function drawPoly(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath();
  ctx.fill();
}

function drawCar(ctx: CanvasRenderingContext2D, x: number, y: number, steer: number) {
  const w = 28;
  const h = 16;
  const cx = x;
  const cy = y;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(cx - w / 2 + 2, cy + 2, w, h / 3);

  // Body
  ctx.fillStyle = C.car;
  ctx.fillRect(cx - w / 2, cy - h / 2, w, h);

  // Windshield
  ctx.fillStyle = C.bg;
  ctx.fillRect(cx - 8, cy - h / 2, 16, 5);

  // Roof
  ctx.fillStyle = C.carAccent;
  ctx.fillRect(cx - 6, cy - h / 2 - 3, 12, 4);

  // Wheels
  ctx.fillStyle = "#333";
  ctx.fillRect(cx - w / 2 - 2, cy - 3, 4, 6);
  ctx.fillRect(cx + w / 2 - 2, cy - 3, 4, 6);
  ctx.fillRect(cx - w / 2 - 2, cy + h / 2 - 5, 4, 6);
  ctx.fillRect(cx + w / 2 - 2, cy + h / 2 - 5, 4, 6);

  // Taillights
  ctx.fillStyle = "#888";
  ctx.fillRect(cx - w / 2, cy + h / 2 - 2, 4, 2);
  ctx.fillRect(cx + w / 2 - 4, cy + h / 2 - 2, 4, 2);
}

function drawObstacle(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  // Other car (simplified rectangle)
  const carW = Math.max(8, w * 0.5);
  const carH = carW * 0.6;
  ctx.fillStyle = C.obstacle;
  ctx.fillRect(x - carW / 2, y - carH, carW, carH);
  // Windshield
  ctx.fillStyle = C.bg;
  ctx.fillRect(x - carW / 4, y - carH, carW / 2, carH * 0.3);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function MiniGame({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const [phase, setPhase] = useState<"idle" | "playing" | "dead">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const rafRef = useRef<number>(0);

  const initGame = useCallback(() => {
    const segments = buildTrack(2000);
    stateRef.current = {
      pos: 0,
      speed: 0,
      maxSpeed: SEG_LEN * 60,
      playerX: 0,
      targetX: 0,
      score: 0,
      alive: true,
      segments,
      frameCount: 0,
    };
    setPhase("playing");
    setScore(0);
  }, []);

  const handleInput = useCallback(() => {
    if (phase === "idle" || phase === "dead") {
      initGame();
    }
  }, [phase, initGame]);

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(e.key)) {
        e.preventDefault();
        if (phase !== "playing") handleInput();
      }
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [phase, handleInput]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;

    function loop() {
      if (!alive) return;
      const g = stateRef.current;
      if (!g || !g.alive) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const dt = 1 / 60;
      const keys = keysRef.current;

      // ── Update ──
      // Accelerate
      g.speed = Math.min(g.speed + g.maxSpeed * 0.5 * dt, g.maxSpeed);

      // Steer
      if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) {
        g.playerX -= 0.04;
      }
      if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) {
        g.playerX += 0.04;
      }
      g.playerX = Math.max(-1, Math.min(1, g.playerX));

      // Move forward
      g.pos += g.speed * dt;
      g.frameCount++;

      // Loop track
      const trackLen = g.segments.length * SEG_LEN;
      if (g.pos >= trackLen) g.pos -= trackLen;

      // Centrifugal force from curves
      const segIdx = Math.floor(g.pos / SEG_LEN) % g.segments.length;
      const curSeg = g.segments[segIdx];
      g.playerX += curSeg.curve * (g.speed / g.maxSpeed) * 0.005;
      g.playerX = Math.max(-1, Math.min(1, g.playerX));

      // Score
      g.score = Math.floor(g.pos / 100);
      setScore(g.score);

      // ── Collision check ──
      for (let i = 0; i < 10; i++) {
        const idx = (segIdx + i) % g.segments.length;
        const seg = g.segments[idx];
        if (seg.hasObstacle) {
          const obsZ = seg.z;
          const dist = obsZ - g.pos;
          if (dist > 0 && dist < SEG_LEN * 1.5) {
            const obsLaneX = seg.obstacleLane * 0.33;
            if (Math.abs(g.playerX - obsLaneX) < 0.18) {
              g.alive = false;
              setPhase("dead");
              setBest((prev) => Math.max(prev, g.score));
              break;
            }
          }
        }
      }

      // Off-road slowdown
      if (Math.abs(g.playerX) > 0.7) {
        g.speed *= 0.97;
      }

      // ── Render ──
      if (!ctx) { rafRef.current = requestAnimationFrame(loop); return; }

      // Sky
      ctx.fillStyle = C.sky;
      ctx.fillRect(0, 0, W, H);

      // Hills silhouette
      ctx.fillStyle = C.hill;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.45);
      for (let x = 0; x <= W; x += 20) {
        const hillY = H * 0.42 + Math.sin((x + g.frameCount * 0.3) * 0.01) * 12
                     + Math.sin((x + g.frameCount * 0.1) * 0.02) * 8;
        ctx.lineTo(x, hillY);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();

      // Road segments (back to front)
      const baseSegIdx = Math.floor(g.pos / SEG_LEN);
      let camX = g.playerX * ROAD_W / 2;
      let camY = CAM_HEIGHT + (curSeg ? curSeg.y : 0);
      let camZ = g.pos - PLAYER_Z;

      let maxY = H;

      // Project all visible segments
      const projected: Array<{
        sx: number; sy: number; sw: number; scale: number;
        seg: Segment; idx: number;
      }> = [];

      let dx = 0;

      for (let i = 0; i < DRAW_DIST; i++) {
        const idx = (baseSegIdx + i) % g.segments.length;
        const seg = g.segments[idx];
        const worldZ = (baseSegIdx + i) * SEG_LEN;

        dx += seg.curve;

        const p = project(
          dx * 3, seg.y, worldZ,
          camX, camY, camZ,
          W, H
        );

        seg.clip = maxY;

        if (p.sy < maxY && p.scale > 0) {
          projected.push({ ...p, seg, idx });
          maxY = p.sy;
        }
      }

      // Draw back to front
      for (let i = projected.length - 1; i >= 0; i--) {
        const cur = projected[i];
        const prev = i < projected.length - 1 ? projected[i + 1] : null;

        if (!prev) continue;

        const isEven = (cur.idx % 2) === 0;

        // Grass
        drawPoly(ctx,
          0, prev.sy, W, prev.sy,
          W, cur.sy, 0, cur.sy,
          isEven ? C.grass : C.grassLight
        );

        // Road
        drawPoly(ctx,
          prev.sx - prev.sw, prev.sy,
          prev.sx + prev.sw, prev.sy,
          cur.sx + cur.sw, cur.sy,
          cur.sx - cur.sw, cur.sy,
          isEven ? C.road : C.roadLight
        );

        // Rumble strips
        const rumbleW = cur.sw * 0.1;
        // Left
        drawPoly(ctx,
          prev.sx - prev.sw - prev.sw * 0.1, prev.sy,
          prev.sx - prev.sw, prev.sy,
          cur.sx - cur.sw, cur.sy,
          cur.sx - cur.sw - rumbleW, cur.sy,
          isEven ? C.rumble : C.rumbleLight
        );
        // Right
        drawPoly(ctx,
          prev.sx + prev.sw, prev.sy,
          prev.sx + prev.sw + prev.sw * 0.1, prev.sy,
          cur.sx + cur.sw + rumbleW, cur.sy,
          cur.sx + cur.sw, cur.sy,
          isEven ? C.rumble : C.rumbleLight
        );

        // Lane markings
        if (isEven) {
          const laneW = cur.sw * 0.02;
          for (let l = -1; l <= 1; l += 2) {
            const lx = cur.sx + cur.sw * l * 0.33;
            const plx = prev.sx + prev.sw * l * 0.33;
            drawPoly(ctx,
              plx - laneW, prev.sy,
              plx + laneW, prev.sy,
              lx + laneW, cur.sy,
              lx - laneW, cur.sy,
              C.lane
            );
          }
        }

        // Obstacles
        if (cur.seg.hasObstacle && cur.scale > 0.003) {
          const obsX = cur.sx + cur.sw * cur.seg.obstacleLane * 0.33;
          const obsW = cur.sw * 0.15;
          if (obsW > 2) {
            drawObstacle(ctx!, obsX, cur.sy, obsW);
          }
        }
      }

      // Player car
      drawCar(ctx!, W / 2, H - 30, g.playerX);

      // Speed indicator
      const speedKmh = Math.round((g.speed / g.maxSpeed) * 280);
      ctx!.fillStyle = C.text;
      ctx!.font = "bold 11px monospace";
      ctx!.textAlign = "right";
      ctx!.fillText(`${speedKmh} km/h`, W - 10, H - 8);

      // Score
      ctx!.textAlign = "left";
      ctx!.fillText(`${g.score}m`, 10, 16);

      rafRef.current = requestAnimationFrame(loop);
    }

    if (phase === "playing") {
      loop();
    }

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  // Draw idle/dead screen
  useEffect(() => {
    if (phase === "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    // Simple road perspective for idle screen
    ctx.fillStyle = C.hill;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.45);
    for (let x = 0; x <= W; x += 20) {
      ctx.lineTo(x, H * 0.42 + Math.sin(x * 0.01) * 12);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();

    // Road
    ctx.fillStyle = C.road;
    ctx.beginPath();
    ctx.moveTo(W * 0.3, H);
    ctx.lineTo(W * 0.7, H);
    ctx.lineTo(W * 0.52, H * 0.5);
    ctx.lineTo(W * 0.48, H * 0.5);
    ctx.closePath();
    ctx.fill();

    // Car
    drawCar(ctx, W / 2, H - 30, 0);

    // Text
    ctx.fillStyle = C.text;
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";

    if (phase === "dead") {
      ctx.fillText(`GAME OVER — ${score}m`, W / 2, H * 0.3);
      if (best > 0) {
        ctx.font = "11px monospace";
        ctx.fillText(`Best: ${best}m`, W / 2, H * 0.3 + 18);
      }
      ctx.font = "11px monospace";
      ctx.fillStyle = "#999";
      ctx.fillText("Press SPACE or tap to retry", W / 2, H * 0.3 + 36);
    } else {
      ctx.fillText("OUTRUN", W / 2, H * 0.28);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#999";
      ctx.fillText("Press SPACE or tap to play", W / 2, H * 0.28 + 20);
      ctx.font = "9px monospace";
      ctx.fillText("← → or A D to steer", W / 2, H * 0.28 + 36);
    }
  }, [phase, score, best]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      onClick={handleInput}
      onTouchStart={(e) => {
        if (phase !== "playing") {
          handleInput();
          return;
        }
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const tx = e.touches[0].clientX - rect.left;
        if (tx < rect.width / 2) {
          keysRef.current.add("ArrowLeft");
          setTimeout(() => keysRef.current.delete("ArrowLeft"), 150);
        } else {
          keysRef.current.add("ArrowRight");
          setTimeout(() => keysRef.current.delete("ArrowRight"), 150);
        }
      }}
      className={className}
      style={{
        width: "100%",
        maxWidth: 600,
        height: "auto",
        display: "block",
        margin: "0 auto",
        imageRendering: "pixelated",
        cursor: "pointer",
        borderRadius: 6,
      }}
      aria-label="OutRun mini-game — press Space to play, arrows to steer"
      tabIndex={0}
    />
  );
}
