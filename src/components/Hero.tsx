import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenContact: (interest?: string) => void;
}

const TITLE = "Converting enterprise complexity into an intelligent core.";

const STATS: Array<[string, string]> = [
  ["5-phase", "Delivery framework"],
  ["2 hubs", "India & Canada delivery"],
  ["24/7", "Follow-the-sun support"],
  ["99.9%", "Managed service uptime"],
];

/**
 * Squarespace-style hero: a full-bleed black canvas, a drifting particle field
 * behind the type, and one centred column — monument headline at weight 300
 * with tight negative tracking, an attribution line, a sub-head, the practice
 * paragraph, the calls to action, and a hairline stat row.
 *
 * The words of the headline rise into place in sequence on mount; the
 * supporting lines follow. Both collapse under prefers-reduced-motion.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK2 = 17000;
    const PUSH2 = 15000;
    let w = 0;
    let h = 0;
    let parts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let raf = 0;
    let running = false;
    const mouse = { x: -1e5, y: -1e5 };

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(120, Math.max(38, Math.round((w * h) / 20000)));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < PUSH2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          p.x += (dx / d) * 1.1;
          p.y += (dy / d) * 1.1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = "rgba(255,255,255,.7)";
        ctx.fill();
      }
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            ctx.strokeStyle = `rgba(255,255,255,${((1 - d2 / LINK2) * 0.26).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    size();
    if (reduced) {
      running = true;
      frame();
      stop();
    } else {
      start();
    }

    const onResize = () => {
      size();
      if (reduced) {
        running = true;
        frame();
        stop();
      }
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -1e5;
      mouse.y = -1e5;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    let io: IntersectionObserver | null = null;
    if (!reduced && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
      io.observe(canvas);
    }

    return () => {
      stop();
      if (io) io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <section className="cx-hero">
      <canvas ref={canvasRef} className="cx-hero-canvas" aria-hidden="true" />
      <div className="cx-hero-glow" />
      <div className="cx-wrap cx-hero-in">
        <div className="cx-hero-center">
          <h1>
            {TITLE.split(" ").map((word, i) => (
              <React.Fragment key={`${word}-${i}`}>
                <span className="cx-w" style={{ "--d": `${(0.1 + i * 0.065).toFixed(2)}s` } as React.CSSProperties}>
                  {word}
                </span>
                {i < TITLE.split(" ").length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </h1>

          <p className="cx-hero-attr" data-rise style={{ "--d": ".62s" } as React.CSSProperties}>
            By Coreenact <span className="cx-dot" /> Official Microsoft Solutions Partner
          </p>

          <p className="cx-hero-sub" data-rise style={{ "--d": ".72s" } as React.CSSProperties}>
            Dynamics 365 Business Central, engineered for the intelligent enterprise.
          </p>

          <p className="cx-hero-copy" data-rise style={{ "--d": ".82s" } as React.CSSProperties}>
            Enterprise Microsoft Solutions Partner specialising in Microsoft Dynamics 365 Business
            Central implementations, NAV-to-Cloud migrations, India GST localization, agentic AI on
            the Microsoft stack, and 24/7 managed support.
          </p>

          <div className="cx-hero-actions" data-rise style={{ "--d": ".92s" } as React.CSSProperties}>
            <button className="cx-btn cx-btn-light" onClick={() => onOpenContact()}>
              Book a consultation <ArrowRight />
            </button>
            <a
              className="cx-btn cx-btn-ghost"
              href="#solutions"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore solutions <ArrowRight />
            </a>
          </div>
        </div>

        <div className="cx-statrow">
          {STATS.map(([value, label]) => (
            <div className="cx-st" key={label} style={{ background: "#000" }}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
