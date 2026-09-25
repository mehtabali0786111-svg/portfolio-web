"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Vec2 {
  x: number;
  y: number;
}

interface PhysicsNode {
  pos: Vec2;
  prev: Vec2;
  pinned: boolean;
}

// ─── Physics helpers ──────────────────────────────────────────────────────────
function makeNode(x: number, y: number, pinned = false): PhysicsNode {
  return { pos: { x, y }, prev: { x, y }, pinned };
}

function verlet(node: PhysicsNode, gravity: number, dt: number) {
  if (node.pinned) return;
  const vx = (node.pos.x - node.prev.x) * 0.98;
  const vy = (node.pos.y - node.prev.y) * 0.98;
  node.prev.x = node.pos.x;
  node.prev.y = node.pos.y;
  node.pos.x += vx;
  node.pos.y += vy + gravity * dt * dt;
}

function constrain(a: PhysicsNode, b: PhysicsNode, restLen: number) {
  const dx = b.pos.x - a.pos.x;
  const dy = b.pos.y - a.pos.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
  const diff = (dist - restLen) / dist / 2;
  const ox = dx * diff;
  const oy = dy * diff;
  if (!a.pinned) {
    a.pos.x += ox;
    a.pos.y += oy;
  }
  if (!b.pinned) {
    b.pos.x -= ox;
    b.pos.y -= oy;
  }
}

// ─── Catmull-Rom spline ───────────────────────────────────────────────────────
function catmullRomPoint(
  p0: Vec2,
  p1: Vec2,
  p2: Vec2,
  p3: Vec2,
  t: number,
): Vec2 {
  const t2 = t * t,
    t3 = t2 * t;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

function buildSpline(pts: Vec2[], segments = 40): Vec2[] {
  const result: Vec2[] = [];
  const n = pts.length;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    for (let s = 0; s <= segments; s++) {
      result.push(catmullRomPoint(p0, p1, p2, p3, s / segments));
    }
  }
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────
export interface LanyardProps {
  cardWidth?: number;
  cardHeight?: number;
  ropeSections?: number;
  ropeColor?: string;
  ropeWidth?: number;
  cardColor?: string;
  cardAccent?: string;
  photo?: string | { src: string };
  cardPadding?: number;
  cardShadow?: string;
  gravity?: number;
  backgroundColor?: string;
  clipColor?: string;
}

export default function Lanyard({
  cardWidth = 200,
  cardHeight = 280,
  ropeSections = 6,
  ropeColor = "#3a3a3a",
  ropeWidth = 26,
  cardColor = "#1a1a2e",
  cardAccent = "#7c3aed",
  photo,
  cardPadding = 20,
  cardShadow = "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08) inset",
  gravity = 1200,
  backgroundColor = "transparent",
  clipColor = "#9a9aa3",
}: LanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<PhysicsNode[]>([]);
  const dragRef = useRef<{
    active: boolean;
    offsetX: number;
    offsetY: number;
  }>({
    active: false,
    offsetX: 0,
    offsetY: 0,
  });
  const cardRotRef = useRef({ y: 0, x: 0 }); // visual tilt
  const sizeRef = useRef({ w: 400, h: 500 });

  // ── Init physics nodes ──────────────────────────────────────────────────────
  const initNodes = useCallback(() => {
    const { w } = sizeRef.current;
    const anchorX = w / 2;
    const anchorY = 0; // pinned at top center
    const safeSections = Math.max(1, Math.round(ropeSections));
    const count = safeSections + 1; // +1 for card node
    const segLen = (cardHeight * 0.9) / safeSections;
    const nodes: PhysicsNode[] = [];
    for (let i = 0; i < count; i++) {
      const pinned = i === 0;
      // Start all nodes bunched near the anchor so they drop into place
      nodes.push(makeNode(anchorX + i * 0.5, anchorY + i * segLen, pinned));
    }
    nodesRef.current = nodes;
  }, [ropeSections, cardHeight]);

  // ── Resize handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      sizeRef.current = { w: width, h: height };
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      initNodes();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [initNodes]);

  // ── Physics loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    initNodes();
    let last = performance.now();

    const GRAVITY = gravity;
    const safeSections = Math.max(1, Math.round(ropeSections));
    const SEG_LEN = (cardHeight * 0.9) / safeSections;

    const tick = (now: number) => {
      const raw = (now - last) / 1000;
      const dt = Math.min(raw, 0.033); // cap at ~30fps physics
      last = now;

      const nodes = nodesRef.current;
      if (!nodes.length) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Integrate
      nodes.forEach((n) => verlet(n, GRAVITY, dt));

      // Constraints (multiple passes for stability)
      for (let iter = 0; iter < 5; iter++) {
        for (let i = 0; i < nodes.length - 1; i++) {
          constrain(nodes[i], nodes[i + 1], SEG_LEN);
        }
        // Re-pin anchor
        nodes[0].pos.x = sizeRef.current.w / 2;
        nodes[0].pos.y = 0;
      }

      // Apply drag to last node (card)
      if (dragRef.current.active) {
        const last_node = nodes[nodes.length - 1];
        last_node.prev.x = last_node.pos.x;
        last_node.prev.y = last_node.pos.y;
      }

      // Tilt card toward screen (dampen y-rotation)
      cardRotRef.current.y *= 0.88;
      cardRotRef.current.x *= 0.88;

      // Draw rope on canvas
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const pts = nodes.map((n) => n.pos);
        const spline = buildSpline(pts, 12);

        ctx.beginPath();
        ctx.strokeStyle = ropeColor;
        ctx.lineWidth = ropeWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        spline.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Center highlight stripe for fabric look
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = Math.max(2, ropeWidth * 0.18);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        spline.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Clip ring at anchor
        ctx.beginPath();
        ctx.arc(
          nodes[0].pos.x,
          nodes[0].pos.y + 2,
          ropeWidth * 0.4,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "#555";
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Position card div
      const cardNode = nodes[nodes.length - 1];
      const cardEl = cardRef.current;
      if (cardEl) {
        const cx = cardNode.pos.x - cardWidth / 2;
        const cy = cardNode.pos.y;
        cardEl.style.transform = `translate(${cx}px, ${cy}px) rotateY(${cardRotRef.current.y}deg) rotateX(${cardRotRef.current.x}deg)`;
      }

      // Position metal hook/clasp exactly where the strap meets the card
      const hookEl = hookRef.current;
      if (hookEl) {
        hookEl.style.transform = `translate(${cardNode.pos.x}px, ${cardNode.pos.y}px) translate(-50%, -55%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gravity, ropeSections, cardHeight, cardWidth, ropeColor, ropeWidth]);

  // ── Pointer events ──────────────────────────────────────────────────────────
  const getContainerPos = (e: React.PointerEvent | PointerEvent): Vec2 => {
    const rect = containerRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = getContainerPos(e.nativeEvent);
    const cardNode = nodesRef.current[nodesRef.current.length - 1];
    dragRef.current = {
      active: true,
      offsetX: pos.x - cardNode.pos.x,
      offsetY: pos.y - cardNode.pos.y,
    };
    cardRotRef.current.y = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const pos = getContainerPos(e.nativeEvent);
    const cardNode = nodesRef.current[nodesRef.current.length - 1];
    const newX = pos.x - dragRef.current.offsetX;
    const newY = pos.y - dragRef.current.offsetY;
    const velX = newX - cardNode.pos.x;
    cardRotRef.current.y += velX * 0.4;
    cardNode.pos.x = newX;
    cardNode.pos.y = newY;
    cardNode.prev.x = newX;
    cardNode.prev.y = newY;
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: backgroundColor,
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none", // FIX: root no longer blocks clicks over its full bounding box
      }}
    >
      {/* Rope canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Badge card */}
      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: cardWidth,
          cursor: dragRef.current.active ? "grabbing" : "grab",
          transformOrigin: "50% 0%",
          perspective: "800px",
          willChange: "transform",
          touchAction: "none",
          pointerEvents: "auto", // FIX: only the card itself is interactive/draggable
        }}
      >
        <BadgeCard
          width={cardWidth}
          height={cardHeight}
          cardColor={cardColor}
          accent={cardAccent}
          photo={photo}
          cardPadding={cardPadding}
          cardShadow={cardShadow}
          clipColor={clipColor}
        />
      </div>

      {/* Metal hook / clasp bridging the strap and the card */}
      <div
        ref={hookRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 5,
          willChange: "transform",
        }}
      >
        <ClipHook size={ropeWidth} color={clipColor} />
      </div>
    </div>
  );
}

// ─── Metal Hook / Clasp (bridges strap to card) ───────────────────────────────
function ClipHook({ size, color }: { size: number; color: string }) {
  // Scale the whole clasp relative to the strap width so it stays
  // proportional whether the strap is thin or thick.
  const w = Math.max(20, size * 1.05);
  const h = w * 2.1;
  const light = shade(color, 70);
  const mid = shade(color, 10);
  const dark = shade(color, -70);
  const gradId = `clipMetal-${Math.round(size * 10)}`;

  return (
    <svg width={w} height={h} viewBox="0 0 48 102" style={{ display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor={light} />
          <stop offset="45%" stopColor={mid} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>

      {/* Outer ring the strap is gripped/folded into (thin band) */}
      <ellipse
        cx="24"
        cy="16"
        rx="14"
        ry="11.5"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="5"
      />
      <ellipse
        cx="24"
        cy="16"
        rx="14"
        ry="11.5"
        fill="none"
        stroke={shade(color, -90)}
        strokeWidth="0.75"
      />
      {/* Subtle highlight on the ring */}
      <path
        d="M14,9 A14,11.5 0 0 1 30,7"
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Hook body curving from the ring down to the pin (slim wire) */}
      <path
        d="M14,24 C9,38 9,48 16,53 C20,56 28,56 32,53 C39,48 39,38 34,24"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M14,24 C9,38 9,48 16,53 C20,56 28,56 32,53 C39,48 39,38 34,24"
        fill="none"
        stroke={shade(color, -90)}
        strokeWidth="6.5"
        strokeLinecap="round"
        opacity="0.15"
      />

      {/* Swivel pin dropping into the card grommet */}
      <rect
        x="20.5"
        y="51"
        width="7"
        height="36"
        rx="3.5"
        fill={`url(#${gradId})`}
        stroke={shade(color, -90)}
        strokeWidth="0.75"
      />
      <rect
        x="22"
        y="55"
        width="1.6"
        height="26"
        rx="0.8"
        fill="rgba(255,255,255,0.3)"
      />
    </svg>
  );
}

function BadgeCard({
  width,
  height,
  cardColor,
  accent,
  photo,
  cardPadding,
  cardShadow,
  clipColor,
}: {
  width: number;
  height: number;
  cardColor: string;
  accent: string;
  photo?: string | { src: string };
  cardPadding: number;
  cardShadow: string;
  clipColor: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        background: `linear-gradient(145deg, ${lighten(cardColor, 10)}, ${cardColor})`,
        boxShadow: cardShadow,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        position: "relative",
      }}
    >
      {/* Top accent band */}
      <div
        style={{
          height: 8,
          background: `linear-gradient(90deg, #1b1b1b, #171121, #2a0962);`,
          flexShrink: 0,
        }}
      />

      {/* Grommet / eyelet where the swivel pin seats */}
      <div
        style={{
          position: "absolute",
          top: -5,
          left: "50%",
          transform: "translateX(-50%)",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, ${shade(clipColor, 70)}, ${shade(clipColor, 10)} 55%, ${shade(clipColor, -60)} 100%)`,
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.35)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "30%",
            borderRadius: "50%",
            background: shade(clipColor, -95),
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* Card body */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",

          boxSizing: "border-box",
        }}
      >
        {/* Decorative lines pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              rgba(255,255,255,0.02) 18px,
              rgba(255,255,255,0.02) 19px
            )`,
            pointerEvents: "none",
          }}
        />

        {/* User photo */}
        {(() => {
          const photoSrc = typeof photo === "string" ? photo : photo?.src;
          return photoSrc ? (
            <img
              src={photoSrc}
              alt="User photo"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 0,
                boxShadow: `0 4px 20px ${accent}66`,
                position: "relative",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                background: `linear-gradient(135deg, ${accent}, ${lighten(accent, 50)})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                fontSize: Math.max(11, width * 0.06),
                fontWeight: 500,
                textAlign: "center",
                position: "relative",
              }}
            >
              Add Photo
            </div>
          );
        })()}
      </div>

      {/* Bottom gradient sheen */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))`,
          pointerEvents: "none",
        }}
      />

      {/* Gloss highlight */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Color helper ─────────────────────────────────────────────────────────────
function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  if (isNaN(num)) return hex;
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

// Like lighten(), but clamps both directions so negative amounts
// (darkening) produce valid hex colors too. Used for the metal hook/grommet.
function shade(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  if (isNaN(num)) return hex;
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0xff) + amount);
  const b = clamp((num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
