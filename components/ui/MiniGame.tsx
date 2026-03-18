"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Palette (matches SammaPix neutral/indigo theme) ───────────────────────
const C = {
  bg: "#171717",        // near-black background
  road: "#262626",      // slightly lighter road surface
  lane: "#6366F1",      // indigo lane dividers
  car: "#6366F1",       // player car — indigo
  carBody: "#818CF8",   // lighter indigo highlight
  carWheel: "#0A0A0A",  // near-black wheels
  carWindshield: "#C7D2FE", // very light indigo windshield
  obstacle: "#E5E5E5",  // neutral light — obstacle cars
  obstacleBody: "#D4D4D4",
  obstacleWheel: "#404040",
  obstacleWindshield: "#737373",
  rock: "#525252",      // barrier/rock
  rockHighlight: "#737373",
  dashLine: "#404040",  // road dash marks
  score: "#E5E5E5",     // score text
  gameOver: "#6366F1",  // game-over accent
  overlay: "rgba(23,23,23,0.82)",
} as const;

// ─── Game constants ─────────────────────────────────────────────────────────
const CANVAS_W = 600;
const CANVAS_H = 180;
const LANES = 3;
const LANE_H = Math.floor(CANVAS_H / LANES); // 60px per lane
const CAR_W = 28;
const CAR_H = 16;
const OBS_W = 26;
const OBS_H = 16;
const CAR_X = 64;       // fixed horizontal position of player
const INITIAL_SPEED = 3.2;
const SPEED_INCREMENT = 0.0008; // per frame
const OBS_INTERVAL_MIN = 55;    // frames between spawns (decreases with speed)
const OBS_INTERVAL_MAX = 120;
const LANE_ANIM_FRAMES = 8;     // frames for lane-change animation

function laneY(lane: number): number {
  return lane * LANE_H + LANE_H / 2 - CAR_H / 2;
}

// ─── Pixel-art drawing helpers ───────────────────────────────────────────────

function drawPlayerCar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  // Body
  ctx.fillStyle = C.car;
  ctx.fillRect(x, y + 3, CAR_W, CAR_H - 6);
  // Roof/cabin
  ctx.fillStyle = C.carBody;
  ctx.fillRect(x + 6, y, CAR_W - 14, 4);
  // Windshield (front)
  ctx.fillStyle = C.carWindshield;
  ctx.fillRect(x + CAR_W - 10, y + 1, 4, 5);
  // Rear window
  ctx.fillStyle = C.carWindshield;
  ctx.fillRect(x + 8, y + 1, 4, 5);
  // Front bumper strip
  ctx.fillStyle = C.carBody;
  ctx.fillRect(x + CAR_W - 3, y + 4, 3, CAR_H - 10);
  // Wheels (4 pixels, near-black)
  ctx.fillStyle = C.carWheel;
  ctx.fillRect(x + 3, y + CAR_H - 5, 6, 4);   // rear-bottom
  ctx.fillRect(x + CAR_W - 9, y + CAR_H - 5, 6, 4); // front-bottom
  ctx.fillRect(x + 3, y + 1, 6, 4);            // rear-top
  ctx.fillRect(x + CAR_W - 9, y + 1, 6, 4);   // front-top
  // Exhaust pixel
  ctx.fillStyle = C.carBody;
  ctx.fillRect(x - 2, y + CAR_H - 7, 2, 2);
}

function drawObstacleCar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: number
): void {
  const isRock = variant === 2;
  if (isRock) {
    // Rock / barrier
    ctx.fillStyle = C.rock;
    ctx.fillRect(x + 2, y + 4, OBS_W - 4, OBS_H - 6);
    ctx.fillStyle = C.rockHighlight;
    ctx.fillRect(x + 4, y + 2, OBS_W - 10, 3);
    ctx.fillRect(x + 2, y + 4, 2, OBS_H - 6);
    return;
  }
  // Oncoming car body
  ctx.fillStyle = C.obstacle;
  ctx.fillRect(x, y + 3, OBS_W, OBS_H - 6);
  // Roof
  ctx.fillStyle = C.obstacleBody;
  ctx.fillRect(x + 5, y, OBS_W - 12, 4);
  // Windshield (facing left — headlights on left side)
  ctx.fillStyle = C.obstacleWindshield;
  ctx.fillRect(x + 2, y + 1, 4, 5);
  // Rear window
  ctx.fillStyle = C.obstacleWindshield;
  ctx.fillRect(x + OBS_W - 8, y + 1, 4, 5);
  // Headlights
  ctx.fillStyle = variant === 0 ? "#FEF08A" : "#FCA5A5";
  ctx.fillRect(x, y + 4, 2, 3);
  ctx.fillRect(x, y + OBS_H - 7, 2, 3);
  // Wheels
  ctx.fillStyle = C.obstacleWheel;
  ctx.fillRect(x + 2, y + CAR_H - 5, 5, 4);
  ctx.fillRect(x + OBS_W - 7, y + OBS_H - 5, 5, 4);
  ctx.fillRect(x + 2, y + 1, 5, 4);
  ctx.fillRect(x + OBS_W - 7, y + 1, 5, 4);
}

function drawRoad(
  ctx: CanvasRenderingContext2D,
  dashOffset: number
): void {
  // Background
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  // Road surface
  ctx.fillStyle = C.road;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Lane dividers (dashed horizontal lines)
  ctx.fillStyle = C.dashLine;
  const DASH_W = 18;
  const GAP = 14;
  const STEP = DASH_W + GAP;
  for (let lane = 1; lane < LANES; lane++) {
    const lineY = lane * LANE_H;
    const offset = dashOffset % STEP;
    for (let x = -STEP + offset; x < CANVAS_W + STEP; x += STEP) {
      ctx.fillRect(Math.floor(x), lineY - 1, DASH_W, 2);
    }
  }

  // Edge lines (solid indigo thin stripes)
  ctx.fillStyle = C.lane;
  ctx.fillRect(0, 0, CANVAS_W, 2);
  ctx.fillRect(0, CANVAS_H - 2, CANVAS_W, 2);
}

function drawHUD(
  ctx: CanvasRenderingContext2D,
  score: number,
  speed: number
): void {
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = C.score;
  ctx.textAlign = "right";
  ctx.fillText(`${score}m`, CANVAS_W - 8, 16);

  // Speed bar (tiny, top-right)
  const barW = 36;
  const barH = 3;
  const barX = CANVAS_W - 8 - barW;
  const barY = 20;
  const fill = Math.min((speed - INITIAL_SPEED) / 6, 1);
  ctx.fillStyle = C.dashLine;
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = C.lane;
  ctx.fillRect(barX, barY, Math.floor(barW * fill), barH);
}

function drawOverlay(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  subLines: string[]
): void {
  ctx.fillStyle = C.overlay;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.textAlign = "center";
  let offsetY = CANVAS_H / 2 - (lines.length - 1) * 10 - 6;
  ctx.font = "bold 14px monospace";
  ctx.fillStyle = C.gameOver;
  for (const line of lines) {
    ctx.fillText(line, CANVAS_W / 2, offsetY);
    offsetY += 20;
  }
  ctx.font = "10px monospace";
  ctx.fillStyle = C.score;
  for (const line of subLines) {
    ctx.fillText(line, CANVAS_W / 2, offsetY);
    offsetY += 14;
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = "idle" | "playing" | "dead";

interface Obstacle {
  x: number;
  lane: number;
  variant: number; // 0 = yellow headlights, 1 = red, 2 = rock
}

interface GameState {
  phase: Phase;
  lane: number;         // current lane (0-2)
  targetLane: number;   // lane being animated toward
  laneAnimFrame: number;
  score: number;
  speed: number;
  obstacles: Obstacle[];
  dashOffset: number;
  framesSinceLastObs: number;
  nextObsIn: number;
  bestScore: number;
}

function makeInitialState(bestScore = 0): GameState {
  return {
    phase: "idle",
    lane: 1,
    targetLane: 1,
    laneAnimFrame: 0,
    score: 0,
    speed: INITIAL_SPEED,
    obstacles: [],
    dashOffset: 0,
    framesSinceLastObs: 0,
    nextObsIn: OBS_INTERVAL_MAX,
    bestScore,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

interface MiniGameProps {
  className?: string;
}

export default function MiniGame({ className }: MiniGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(makeInitialState());
  const rafRef = useRef<number>(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [bestScore, setBestScore] = useState(0);

  // Persist best score across mounts via ref (no localStorage to keep it light)
  const bestScoreRef = useRef(0);

  const startGame = useCallback(() => {
    const st = stateRef.current;
    stateRef.current = makeInitialState(bestScoreRef.current);
    stateRef.current.phase = "playing";
    stateRef.current.bestScore = bestScoreRef.current;
    setPhase("playing");
    // Suppress unused variable warning: st is read only for its bestScore which we already capture above
    void st;
  }, []);

  const handleInput = useCallback(
    (direction: "up" | "down" | "start") => {
      const st = stateRef.current;
      if (st.phase === "idle" || st.phase === "dead") {
        startGame();
        return;
      }
      if (st.phase !== "playing") return;
      if (direction === "up" && st.targetLane > 0) {
        st.targetLane = st.targetLane - 1;
        st.laneAnimFrame = 0;
      } else if (direction === "down" && st.targetLane < LANES - 1) {
        st.targetLane = st.targetLane + 1;
        st.laneAnimFrame = 0;
      }
    },
    [startGame]
  );

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        handleInput("up");
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        handleInput("down");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleInput]);

  // Touch / click on canvas
  const handleCanvasInteract = useCallback(
    (clientX: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const relX = clientX - rect.left;
      const mid = rect.width / 2;
      const st = stateRef.current;
      if (st.phase === "idle" || st.phase === "dead") {
        startGame();
        return;
      }
      handleInput(relX < mid ? "up" : "down");
    },
    [handleInput, startGame]
  );

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pixel-crisp rendering
    ctx.imageSmoothingEnabled = false;

    let alive = true;

    function tick() {
      if (!alive) return;
      const st = stateRef.current;

      // ── Draw road ──
      drawRoad(ctx!, st.dashOffset);

      if (st.phase === "idle") {
        drawOverlay(
          ctx!,
          ["PIXEL RACER"],
          ["SPACE / tap to play", "arrow keys or tap sides to steer"]
        );
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (st.phase === "dead") {
        // Still show obstacles frozen
        for (const obs of st.obstacles) {
          drawObstacleCar(ctx!, obs.x, laneY(obs.lane), obs.variant);
        }
        const carVisualY = laneY(st.lane);
        drawPlayerCar(ctx!, CAR_X, carVisualY);
        drawHUD(ctx!, st.score, st.speed);
        drawOverlay(
          ctx!,
          ["GAME OVER", `${st.score}m`],
          [
            `best: ${st.bestScore}m`,
            "SPACE / tap to retry",
          ]
        );
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // ── Update ──

      // Speed ramp
      st.speed += SPEED_INCREMENT;

      // Dash offset scroll
      st.dashOffset += st.speed;

      // Lane animation
      if (st.lane !== st.targetLane) {
        st.laneAnimFrame++;
        if (st.laneAnimFrame >= LANE_ANIM_FRAMES) {
          st.lane = st.targetLane;
          st.laneAnimFrame = 0;
        }
      }

      // Compute visual Y of player car (lerped during lane change)
      const fromY = laneY(st.lane);
      const toY = laneY(st.targetLane);
      const t = st.laneAnimFrame / LANE_ANIM_FRAMES;
      const carVisualY = Math.round(fromY + (toY - fromY) * t);

      // Score (distance in "meters")
      st.score = Math.floor((st.score) + st.speed * 0.08);

      // Obstacle spawn
      st.framesSinceLastObs++;
      if (st.framesSinceLastObs >= st.nextObsIn) {
        st.framesSinceLastObs = 0;
        const speedFactor = Math.min((st.speed - INITIAL_SPEED) / 6, 1);
        const minInterval = Math.round(
          OBS_INTERVAL_MIN + (OBS_INTERVAL_MIN * 0.5 * (1 - speedFactor))
        );
        const maxInterval = Math.round(
          OBS_INTERVAL_MAX - (OBS_INTERVAL_MAX * 0.4 * speedFactor)
        );
        st.nextObsIn =
          minInterval + Math.floor(Math.random() * (maxInterval - minInterval));

        // Avoid spawning on same lane as player (give grace period)
        const safeZone = [st.targetLane];
        const availableLanes = [0, 1, 2].filter((l) => !safeZone.includes(l));
        const lane =
          availableLanes[Math.floor(Math.random() * availableLanes.length)];
        const variant = Math.floor(Math.random() * 3);
        st.obstacles.push({ x: CANVAS_W + 10, lane: lane ?? 0, variant });
      }

      // Move obstacles
      for (const obs of st.obstacles) {
        obs.x -= st.speed;
      }
      // Remove off-screen
      st.obstacles = st.obstacles.filter((o) => o.x > -OBS_W - 10);

      // ── Collision detection ──
      // Use lane-based collision with a 2px margin of forgiveness
      const playerLeft = CAR_X + 2;
      const playerRight = CAR_X + CAR_W - 2;
      const playerTop = carVisualY + 2;
      const playerBottom = carVisualY + CAR_H - 2;

      for (const obs of st.obstacles) {
        const obsLeft = obs.x + 2;
        const obsRight = obs.x + OBS_W - 2;
        const obsTop = laneY(obs.lane) + 2;
        const obsBottom = laneY(obs.lane) + OBS_H - 2;

        if (
          playerRight > obsLeft &&
          playerLeft < obsRight &&
          playerBottom > obsTop &&
          playerTop < obsBottom
        ) {
          // Collision!
          st.phase = "dead";
          if (st.score > bestScoreRef.current) {
            bestScoreRef.current = st.score;
            setBestScore(st.score);
          }
          st.bestScore = bestScoreRef.current;
          setPhase("dead");
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      }

      // ── Draw ──

      // Obstacles (behind player)
      for (const obs of st.obstacles) {
        if (obs.x > CAR_X) {
          drawObstacleCar(ctx!, obs.x, laneY(obs.lane), obs.variant);
        }
      }

      // Player car
      drawPlayerCar(ctx!, CAR_X, carVisualY);

      // Obstacles in front of player (visual layering)
      for (const obs of st.obstacles) {
        if (obs.x <= CAR_X) {
          drawObstacleCar(ctx!, obs.x, laneY(obs.lane), obs.variant);
        }
      }

      drawHUD(ctx!, st.score, st.speed);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Best score label */}
      {bestScore > 0 && (
        <p className="text-[10px] font-mono text-[#737373]">
          best: {bestScore}m
        </p>
      )}
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="rounded border border-[#262626] cursor-pointer select-none"
        style={{
          imageRendering: "pixelated",
          width: "100%",
          maxWidth: CANVAS_W,
          height: "auto",
          display: "block",
        }}
        onClick={(e) => handleCanvasInteract(e.clientX)}
        onTouchStart={(e) => {
          e.preventDefault();
          handleCanvasInteract(e.touches[0].clientX);
        }}
        aria-label="Pixel Racer mini-game — press Space or tap to play"
        role="img"
      />
      <p className="text-[10px] font-mono text-[#525252]">
        {phase === "idle"
          ? "press SPACE or tap to play while you wait"
          : phase === "playing"
          ? "steer: arrow keys  |  tap left/right"
          : "tap or press SPACE to retry"}
      </p>
    </div>
  );
}
