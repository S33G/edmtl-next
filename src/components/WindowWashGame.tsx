"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface Droplet {
  x: number;
  y: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

interface Streak {
  x: number;
  y: number;
  length: number;
  opacity: number;
  width: number;
}

type GameState = "idle" | "playing" | "done";

const SQUEEGEE_WIDTH = 180;
const SQUEEGEE_HEIGHT = 50;
const CLEAN_THRESHOLD = 0.93;
const CHECK_INTERVAL_MS = 300;
const MAX_DROPLETS = 30;
const DROPLET_SPAWN_RATE = 1;

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getRating(seconds: number): { label: string; emoji: string } {
  if (seconds < 8) return { label: "Lightning Fast!", emoji: "\u26A1" };
  if (seconds < 15) return { label: "Speed Demon!", emoji: "\uD83C\uDFCE\uFE0F" };
  if (seconds < 25) return { label: "Pretty Quick!", emoji: "\uD83D\uDC4D" };
  if (seconds < 40) return { label: "Steady Hands", emoji: "\uD83E\uDDE4" };
  if (seconds < 60) return { label: "Thorough Cleaner", emoji: "\uD83E\uDDFD" };
  return { label: "Taking Your Time", emoji: "\uD83D\uDC22" };
}

function generateDirtyWindow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const rng = seededRandom(42);

  ctx.fillStyle = "rgba(120, 100, 70, 0.55)";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 3000; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const r = rng() * 30 + 5;
    const alpha = rng() * 0.3 + 0.05;
    const hue = 30 + rng() * 30;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 30%, ${35 + rng() * 20}%, ${alpha})`;
    ctx.fill();
  }

  for (let i = 0; i < 40; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const rx = rng() * 120 + 40;
    const ry = rng() * 80 + 30;
    const alpha = rng() * 0.2 + 0.1;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rng() * Math.PI, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(35, 25%, 30%, ${alpha})`;
    ctx.fill();
  }

  for (let i = 0; i < 60; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const r = rng() * 20 + 8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200, 200, 180, ${rng() * 0.25 + 0.05})`;
    ctx.lineWidth = rng() * 2 + 0.5;
    ctx.stroke();
  }

  for (let i = 0; i < 20; i++) {
    const cx = rng() * w;
    const cy = rng() * h;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rng() * Math.PI * 2);
    ctx.beginPath();
    for (let j = 0; j < 5; j++) {
      const fx = (rng() - 0.5) * 30;
      const fy = (rng() - 0.5) * 40;
      ctx.ellipse(
        fx,
        fy,
        rng() * 8 + 3,
        rng() * 12 + 5,
        rng() * Math.PI,
        0,
        Math.PI * 2
      );
    }
    ctx.fillStyle = `rgba(160, 140, 100, ${rng() * 0.15 + 0.05})`;
    ctx.fill();
    ctx.restore();
  }

  const topGradient = ctx.createLinearGradient(0, 0, 0, h * 0.3);
  topGradient.addColorStop(0, "rgba(90, 75, 50, 0.3)");
  topGradient.addColorStop(1, "rgba(90, 75, 50, 0)");
  ctx.fillStyle = topGradient;
  ctx.fillRect(0, 0, w, h * 0.3);
}

function generateCleanWindow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#87CEEB");
  sky.addColorStop(0.4, "#B0E0FF");
  sky.addColorStop(0.7, "#D4EFFF");
  sky.addColorStop(1, "#E8F4FD");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const rng = seededRandom(99);
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  for (let i = 0; i < 8; i++) {
    const cx = rng() * w;
    const cy = rng() * h * 0.5;
    for (let j = 0; j < 5; j++) {
      ctx.beginPath();
      ctx.arc(
        cx + (rng() - 0.5) * 100,
        cy + (rng() - 0.5) * 30,
        rng() * 40 + 20,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  const sheen = ctx.createLinearGradient(0, 0, w, h);
  sheen.addColorStop(0, "rgba(255, 255, 255, 0.08)");
  sheen.addColorStop(0.3, "rgba(255, 255, 255, 0.02)");
  sheen.addColorStop(0.7, "rgba(255, 255, 255, 0.05)");
  sheen.addColorStop(1, "rgba(255, 255, 255, 0.1)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);
}

export default function WindowWashGame() {
  const cleanCanvasRef = useRef<HTMLCanvasElement>(null);
  const dirtyCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [gameState, setGameState] = useState<GameState>("idle");
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dropletsRef = useRef<Droplet[]>([]);
  const streaksRef = useRef<Streak[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isDrawingRef = useRef(false);
  const gameStateRef = useRef<GameState>("idle");

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const startGame = useCallback(() => {
    if (gameStateRef.current !== "idle") return;
    setGameState("playing");
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      setElapsedTime((Date.now() - startTimeRef.current) / 1000);
    }, 50);
  }, []);

  const calculateProgress = useCallback(() => {
    const canvas = dirtyCanvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparent = 0;
    const step = 8;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if (data[i] === 0) transparent++;
    }
    return total > 0 ? transparent / total : 0;
  }, []);

  const endGame = useCallback(() => {
    const time = (Date.now() - startTimeRef.current) / 1000;
    setFinalTime(time);
    setGameState("done");
    setProgress(1);

    if (timerRef.current) clearInterval(timerRef.current);
    if (checkRef.current) clearInterval(checkRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  const clearDirtyRect = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 4);
      ctx.fill();
      ctx.restore();
    },
    []
  );

  const squeegee = useCallback(
    (x: number, y: number) => {
      const canvas = dirtyCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const prev = lastPosRef.current;

      if (prev) {
        const dx = x - prev.x;
        const dy = y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.floor(dist / 4));

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const ix = prev.x + dx * t;
          const iy = prev.y + dy * t;
          clearDirtyRect(
            ctx,
            ix - SQUEEGEE_WIDTH / 2,
            iy - SQUEEGEE_HEIGHT / 2,
            SQUEEGEE_WIDTH,
            SQUEEGEE_HEIGHT
          );
        }

        if (dist > 5) {
          for (let i = 0; i < DROPLET_SPAWN_RATE; i++) {
            if (dropletsRef.current.length < MAX_DROPLETS) {
              dropletsRef.current.push({
                x: x + (Math.random() - 0.5) * SQUEEGEE_WIDTH * 0.8,
                y: y + SQUEEGEE_HEIGHT / 2 + Math.random() * 4,
                vy: Math.random() * 1.5 + 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.3 + 0.15,
                life: 1,
              });
            }
          }

          if (Math.random() > 0.85) {
            streaksRef.current.push({
              x: x + (Math.random() - 0.5) * SQUEEGEE_WIDTH * 0.5,
              y,
              length: Math.random() * 20 + 10,
              opacity: 0.2,
              width: Math.random() * 1 + 0.3,
            });
          }
        }
      } else {
        clearDirtyRect(
          ctx,
          x - SQUEEGEE_WIDTH / 2,
          y - SQUEEGEE_HEIGHT / 2,
          SQUEEGEE_WIDTH,
          SQUEEGEE_HEIGHT
        );
      }

      lastPosRef.current = { x, y };
    },
    [clearDirtyRect]
  );

  const drawOverlay = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dropletsRef.current = dropletsRef.current.filter((d) => d.life > 0);
    for (const drop of dropletsRef.current) {
      drop.y += drop.vy;
      drop.life -= 0.04;
      drop.opacity = Math.max(0, drop.opacity - 0.01);
      drop.vy += 0.06;

      ctx.beginPath();
      ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 210, 240, ${drop.opacity * drop.life})`;
      ctx.fill();
    }

    streaksRef.current = streaksRef.current.filter((s) => s.opacity > 0);
    for (const streak of streaksRef.current) {
      streak.opacity -= 0.015;
      ctx.beginPath();
      ctx.moveTo(streak.x, streak.y);
      ctx.lineTo(
        streak.x + (Math.random() - 0.5) * 3,
        streak.y + streak.length
      );
      ctx.strokeStyle = `rgba(200, 220, 240, ${streak.opacity})`;
      ctx.lineWidth = streak.width;
      ctx.stroke();
    }

    if (
      lastPosRef.current &&
      isDrawingRef.current &&
      gameStateRef.current === "playing"
    ) {
      const { x, y } = lastPosRef.current;

      ctx.fillStyle = "rgba(60, 60, 70, 0.9)";
      ctx.beginPath();
      ctx.roundRect(x - 6, y - SQUEEGEE_HEIGHT / 2 - 30, 12, 30, 3);
      ctx.fill();

      ctx.fillStyle = "rgba(50, 130, 200, 0.85)";
      ctx.beginPath();
      ctx.roundRect(
        x - SQUEEGEE_WIDTH / 2,
        y - SQUEEGEE_HEIGHT / 2,
        SQUEEGEE_WIDTH,
        SQUEEGEE_HEIGHT,
        3
      );
      ctx.fill();

      ctx.fillStyle = "rgba(30, 30, 30, 0.7)";
      ctx.fillRect(
        x - SQUEEGEE_WIDTH / 2,
        y + SQUEEGEE_HEIGHT / 2 - 3,
        SQUEEGEE_WIDTH,
        3
      );
    }

    if (gameStateRef.current === "playing") {
      animFrameRef.current = requestAnimationFrame(drawOverlay);
    }
  }, []);

  const setupCanvases = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    [cleanCanvasRef, dirtyCanvasRef, overlayCanvasRef].forEach((ref) => {
      const canvas = ref.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
    });

    const cleanCtx = cleanCanvasRef.current?.getContext("2d");
    if (cleanCtx) generateCleanWindow(cleanCtx, w, h);

    const dirtyCtx = dirtyCanvasRef.current?.getContext("2d");
    if (dirtyCtx) generateDirtyWindow(dirtyCtx, w, h);
  }, []);

  useEffect(() => {
    setupCanvases();

    const onResize = () => {
      if (gameStateRef.current === "idle") {
        setupCanvases();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setupCanvases]);

  useEffect(() => {
    const canvas = dirtyCanvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      if (gameStateRef.current === "done") return;

      if (gameStateRef.current === "idle") {
        startGame();
        checkRef.current = setInterval(() => {
          const p = calculateProgress();
          setProgress(p);
          if (p >= CLEAN_THRESHOLD) {
            endGame();
          }
        }, CHECK_INTERVAL_MS);
        animFrameRef.current = requestAnimationFrame(drawOverlay);
      }

      isDrawingRef.current = true;
      lastPosRef.current = null;
      const rect = canvas.getBoundingClientRect();
      squeegee(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onPointerMove = (e: PointerEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current || gameStateRef.current !== "playing") return;
      const rect = canvas.getBoundingClientRect();

      const coalescedEvents = e.getCoalescedEvents?.() ?? [];
      if (coalescedEvents.length > 1) {
        for (const ce of coalescedEvents) {
          squeegee(ce.clientX - rect.left, ce.clientY - rect.top);
        }
      } else {
        squeegee(e.clientX - rect.left, e.clientY - rect.top);
      }
    };

    const onPointerUp = () => {
      isDrawingRef.current = false;
      lastPosRef.current = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);
    canvas.style.touchAction = "none";

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
    };
  }, [startGame, calculateProgress, endGame, squeegee, drawOverlay]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (checkRef.current) clearInterval(checkRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleRestart = useCallback(() => {
    setGameState("idle");
    setProgress(0);
    setElapsedTime(0);
    setFinalTime(0);
    dropletsRef.current = [];
    streaksRef.current = [];
    lastPosRef.current = null;
    isDrawingRef.current = false;

    if (timerRef.current) clearInterval(timerRef.current);
    if (checkRef.current) clearInterval(checkRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    setupCanvases();
  }, [setupCanvases]);

  const formatTime = (t: number) => {
    const s = Math.floor(t);
    const ms = Math.floor((t % 1) * 10);
    return `${s}.${ms}s`;
  };

  const rating = getRating(finalTime);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{ cursor: gameState === "playing" ? "none" : "default" }}
    >
      <canvas
        ref={cleanCanvasRef}
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />

      <canvas
        ref={dirtyCanvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />

      <canvas
        ref={overlayCanvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div className="pointer-events-auto absolute top-4 left-4 flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/60 transition-colors"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            &larr; Back
          </Link>
          <Image
            src="/images/edm-main-logo.png"
            alt="EDMTL"
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
        </div>

        {gameState === "playing" && (
          <>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm">
              <span
                className="text-white/70 text-xs font-medium uppercase tracking-wider"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Cleaned
              </span>
              <div className="w-32 h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${Math.min(100, progress * 100)}%` }}
                />
              </div>
              <span
                className="text-white text-sm font-bold"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {Math.floor(progress * 100)}%
              </span>
            </div>

            <div
              className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm text-white text-lg font-bold"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {formatTime(elapsedTime)}
            </div>
          </>
        )}

        {gameState === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8 py-10 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 max-w-md mx-4">
              <Image
                src="/images/edm-main-logo.png"
                alt="EDMTL"
                width={80}
                height={80}
                className="mx-auto mb-4 rounded-xl"
                priority
              />
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Window Washer
              </h2>
              <p
                className="text-white/70 text-base"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Drag to squeegee the window clean!
              </p>
              <p
                className="text-white/40 text-sm mt-3"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Timer starts when you begin
              </p>
            </div>
          </div>
        )}

        {gameState === "done" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto text-center px-10 py-10 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 max-w-sm mx-4 shadow-2xl">
              <div className="text-5xl mb-3">{rating.emoji}</div>
              <h2
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Sparkling Clean!
              </h2>
              <p
                className="text-emerald-400 font-semibold text-lg mb-4"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {rating.label}
              </p>

              <div className="bg-white/10 rounded-xl px-6 py-4 mb-6">
                <p
                  className="text-white/60 text-xs uppercase tracking-wider mb-1"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  Your Time
                </p>
                <p
                  className="text-white text-4xl font-bold"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {formatTime(finalTime)}
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="w-full px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-base transition-colors active:scale-95 transform"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Play Again
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 opacity-50">
                <Image
                  src="/images/edm-main-logo.png"
                  alt="EDMTL"
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                <span
                  className="text-white/60 text-xs"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  EDMTL
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
