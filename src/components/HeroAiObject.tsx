import React, { useEffect, useRef } from "react";

/**
 * HeroAiObject
 * ---------------------------------------------------------------------------
 * A 3D "AI core" for the hero: a rotating icosahedral neural mesh — glowing
 * nodes joined by edges, wrapped in a faint outer cage, with data motes
 * orbiting it. Drawn on a canvas with a hand-rolled 3D projection so it needs
 * no WebGL, no three.js and no network asset: it renders identically offline,
 * in the single-file preview and on GitHub Pages.
 *
 * The palette is the theme's — lime nodes, white edges — so it sits on the black
 * hero like the rest of the system. Honours prefers-reduced-motion by drawing a
 * single static frame.
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const NORM = Math.hypot(1, PHI);

// The 12 vertices of an icosahedron, normalised to a unit sphere.
const VERTICES: Array<[number, number, number]> = (
  [
    [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
    [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
    [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
  ] as Array<[number, number, number]>
).map(([x, y, z]) => [x / NORM, y / NORM, z / NORM] as [number, number, number]);

// Edges are vertex pairs one edge-length apart (the 30 edges of the solid).
const EDGES: Array<[number, number]> = [];
for (let i = 0; i < VERTICES.length; i += 1) {
  for (let j = i + 1; j < VERTICES.length; j += 1) {
    const [ax, ay, az] = VERTICES[i];
    const [bx, by, bz] = VERTICES[j];
    if (Math.hypot(ax - bx, ay - by, az - bz) < 1.2) EDGES.push([i, j]);
  }
}
// Data motes drifting around the core, spread over a sphere a little wider.
const MOTES = Array.from({ length: 26 }, (_, i) => {
  const t = Math.acos(1 - (2 * (i + 0.5)) / 26);
  const p = Math.PI * (3 - Math.sqrt(5)) * i;
  return {
    x: Math.sin(t) * Math.cos(p),
    y: Math.cos(t),
    z: Math.sin(t) * Math.sin(p),
    r: 1.45 + (i % 3) * 0.12,
    speed: 0.25 + ((i * 37) % 100) / 220,
  };
});

const LIME = [200, 219, 83] as const;

export const HeroAiObject: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = 0;
    let dpr = 1;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = Math.max(1, Math.min(rect.width, rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer =
      typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    if (observer) observer.observe(canvas);
    else window.addEventListener("resize", resize);

    const project = (x: number, y: number, z: number, t: number) => {
      const ry = t * 0.55;
      const rx = -0.34 + Math.sin(t * 0.4) * 0.12;
      // rotate Y then X
      const cx1 = x * Math.cos(ry) - z * Math.sin(ry);
      const cz1 = x * Math.sin(ry) + z * Math.cos(ry);
      const cy1 = y * Math.cos(rx) - cz1 * Math.sin(rx);
      const cz2 = y * Math.sin(rx) + cz1 * Math.cos(rx);
      const D = 3.1;
      const f = size * 0.44;
      const s = f / (D - cz2);
      return { x: size / 2 + cx1 * s, y: size / 2 + cy1 * s, z: cz2, s };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);

      // soft core glow
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size * 0.5);
      g.addColorStop(0, "rgba(200,219,83,0.16)");
      g.addColorStop(0.5, "rgba(200,219,83,0.05)");
      g.addColorStop(1, "rgba(200,219,83,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);

      const pts = VERTICES.map(([x, y, z]) => project(x, y, z, t));

      // edges, dimmer when they fall behind the core
      ctx.lineWidth = Math.max(1, size * 0.0035);
      for (const [i, j] of EDGES) {
        const a = pts[i];
        const b = pts[j];
        const depth = (a.z + b.z) / 2;
        const alpha = 0.10 + (depth + 1) * 0.16;
        ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      const pulse = 1 + Math.sin(t * 1.6) * 0.12;
      for (const p of pts) {
        const depth = (p.z + 1) / 2;
        const r = size * (0.008 + depth * 0.016) * pulse;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${LIME[0]},${LIME[1]},${LIME[2]},${(0.45 + depth * 0.55).toFixed(3)})`;
        ctx.shadowColor = `rgba(${LIME[0]},${LIME[1]},${LIME[2]},0.85)`;
        ctx.shadowBlur = size * 0.02 * (0.5 + depth);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // orbiting motes
      for (const m of MOTES) {
        const a = t * m.speed;
        const x = m.x * Math.cos(a) - m.z * Math.sin(a);
        const z = m.x * Math.sin(a) + m.z * Math.cos(a);
        const p = project(x * m.r, m.y * m.r, z * m.r, t);
        const depth = (p.z + 1) / 2;
        if (depth < 0.35) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, size * 0.004 * depth), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(depth * 0.7).toFixed(3)})`;
        ctx.fill();
      }
    };

    if (reduce) {
      draw(0.9);
    } else {
      let t = 0;
      const loop = () => {
        t += 0.008;
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default HeroAiObject;
