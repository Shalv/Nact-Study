import React, { useEffect, useRef } from "react";

/**
 * HeroStone
 * ---------------------------------------------------------------------------
 * A rotating 3D stone for the hero background. Built from scratch: an
 * icosahedron subdivided twice, each vertex pushed in or out by a smooth
 * deterministic noise so it reads as a lumpy rock rather than a sphere, then
 * flat-shaded face by face with a key light and a lime rim light, painter-sorted
 * back to front.
 *
 * Everything is generated at runtime on a 2D canvas — no WebGL, no three.js and
 * no model file — so it renders identically offline, in the single-file preview
 * and on GitHub Pages. Honours prefers-reduced-motion by drawing one frame.
 */

const T = (1 + Math.sqrt(5)) / 2;

// Icosahedron: 12 vertices, 20 faces.
const ICO_V: Array<[number, number, number]> = [
  [-1, T, 0], [1, T, 0], [-1, -T, 0], [1, -T, 0],
  [0, -1, T], [0, 1, T], [0, -1, -T], [0, 1, -T],
  [T, 0, -1], [T, 0, 1], [-T, 0, -1], [-T, 0, 1],
];
const ICO_F: Array<[number, number, number]> = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

type V3 = [number, number, number];
const norm = (v: V3): V3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

// smooth pseudo-noise from sines — deterministic, so the rock is always the same
const lump = (x: number, y: number, z: number) =>
  0.52 * Math.sin(2.3 * x + 0.7) * Math.cos(2.1 * y + 1.3) +
  0.30 * Math.sin(3.7 * z + 2.1) * Math.cos(1.9 * x + 0.2) +
  0.18 * Math.sin(5.3 * y + 0.9) * Math.cos(4.1 * z + 1.7);

/** Subdivide + displace once, returning a lumpy low-poly solid. */
function buildStone() {
  let verts: V3[] = ICO_V.map((v) => norm(v));
  let faces: Array<[number, number, number]> = ICO_F.map((f) => [...f] as [number, number, number]);

  for (let pass = 0; pass < 2; pass += 1) {
    const midCache = new Map<string, number>();
    const next: Array<[number, number, number]> = [];
    const mid = (a: number, b: number) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      const hit = midCache.get(key);
      if (hit !== undefined) return hit;
      const m = norm([
        (verts[a][0] + verts[b][0]) / 2,
        (verts[a][1] + verts[b][1]) / 2,
        (verts[a][2] + verts[b][2]) / 2,
      ]);
      verts.push(m);
      const idx = verts.length - 1;
      midCache.set(key, idx);
      return idx;
    };
    for (const [a, b, c] of faces) {
      const ab = mid(a, b);
      const bc = mid(b, c);
      const ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }

  // push every vertex along its own normal by the noise field -> a rock
  verts = verts.map(([x, y, z]) => {
    const r = 1 + 0.26 * lump(x, y, z);
    return [x * r, y * r, z * r] as V3;
  });

  return { verts, faces };
}

const STONE = buildStone();

// key light + a lime rim, matching the theme accent
const LIGHT = norm([-0.45, 0.72, 0.53]);
const LIME: V3 = [200, 219, 83];

export const HeroStone: React.FC<{ className?: string }> = ({ className }) => {
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
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = Math.max(1, Math.min(rect.width, rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    if (observer) observer.observe(canvas);
    else window.addEventListener("resize", resize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const ry = t * 0.32;
      const rx = -0.22 + Math.sin(t * 0.22) * 0.09;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const D = 3.4;
      const f = size * 0.85; // focal length in px: rock radius ends up ~1/3 of the box

      // rotate once per frame
      const rot = STONE.verts.map(([x, y, z]) => {
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        return [x1, y1, z2] as V3;
      });

      // soft lime halo behind the rock
      const halo = ctx.createRadialGradient(cx, cy, size * 0.04, cx, cy, size * 0.5);
      halo.addColorStop(0, "rgba(200,219,83,0.16)");
      halo.addColorStop(0.55, "rgba(200,219,83,0.04)");
      halo.addColorStop(1, "rgba(200,219,83,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, size, size);

      const projected = rot.map(([x, y, z]) => {
        const s = f / (D - z);
        return { x: cx + x * s, y: cy + y * s, z };
      });

      // painter's algorithm: far faces first
      const order = STONE.faces
        .map((face, i) => ({ i, z: (rot[face[0]][2] + rot[face[1]][2] + rot[face[2]][2]) / 3 }))
        .sort((a, b) => a.z - b.z);

      ctx.lineJoin = "round";
      for (const { i } of order) {
        const [ia, ib, ic] = STONE.faces[i];
        const a = projected[ia], b = projected[ib], c = projected[ic];

        // face normal from the rotated vertices
        const ux = rot[ib][0] - rot[ia][0], uy = rot[ib][1] - rot[ia][1], uz = rot[ib][2] - rot[ia][2];
        const vx = rot[ic][0] - rot[ia][0], vy = rot[ic][1] - rot[ia][1], vz = rot[ic][2] - rot[ia][2];
        let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        const nl = Math.hypot(nx, ny, nz) || 1;
        nx /= nl; ny /= nl; nz /= nl;

        const key = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
        const depth = (rot[ia][2] + rot[ib][2] + rot[ic][2]) / 3;
        // faces pointing away are darker (occlusion stand-in)
        const facing = Math.max(0, (depth + 1) / 2);
        const shade = 0.16 + key * 0.78;
        const base = 58 + shade * 152;

        // lime rim where the surface turns away from the viewer
        const rim = Math.pow(1 - Math.min(1, Math.abs(nz)), 2.2) * (0.45 + key * 0.55);
        const r = Math.round(base + (LIME[0] - base) * rim * 0.7);
        const g = Math.round(base + (LIME[1] - base) * rim * 0.7);
        const bl = Math.round(base + (LIME[2] - base) * rim * 0.7);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.fillStyle = `rgb(${r},${g},${bl})`;
        ctx.fill();
        // faint facet edge for the low-poly read
        ctx.strokeStyle = `rgba(0,0,0,${0.07 + (1 - facing) * 0.2})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    };

    if (reduce) {
      draw(1.2);
    } else {
      let t = 0;
      const loop = () => {
        t += 0.006;
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

  return <canvas ref={canvasRef} className={className} aria-hidden="true" role="presentation" />;
};

export default HeroStone;
