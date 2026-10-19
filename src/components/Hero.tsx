import React from "react";
import { ArrowRight } from "lucide-react";
import { HeroStone } from "./HeroStone";

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenContact: (interest?: string) => void;
}

const SPECIALISMS = [
  "Dynamics 365 Business Central",
  "NAV to Cloud Migration",
  "India GST Localization",
  "24/7 Managed Support",
];

const STACK: Array<[string, string]> = [
  ["/logos/dynamics-365-business-central.png", "Dynamics 365 Business Central"],
  ["/logos/microsoft-dynamics-365.png", "Microsoft Dynamics 365"],
  ["/logos/microsoft-power-platform.webp", "Microsoft Power Platform"],
  ["/logos/microsoft-power-bi.png", "Microsoft Power BI"],
  ["/logos/microsoft-power-apps.webp", "Microsoft Power Apps"],
  ["/logos/microsoft-azure.png", "Microsoft Azure"],
  ["/logos/microsoft-loop.png", "Microsoft Loop"],
  ["/logos/microsoft-outlook.png", "Microsoft Outlook"],
];

/**
 * Hero — centred, with a rotating 3D stone behind it.
 *
 * Restructured from the left-aligned layout: the composition is now centred on
 * the near-black canvas, and the hero's subject is the stone itself — a low-poly
 * rock turning slowly behind the type, lit by a lime rim so it reads as the
 * "intelligent core" the headline promises. A soft radial scrim sits between the
 * stone and the copy so the headline stays legible while the rock's silhouette
 * and glow show around it. The specialisms run as a bottom bar, and the proof
 * points + Microsoft stack follow in a strip below.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <>
      <section className="cx-hero">
        <div className="cx-hero-stone" aria-hidden>
          <HeroStone className="cx-hero-stone-canvas" />
        </div>
        <div className="cx-hero-scrim" aria-hidden />

        <div className="cx-wrap cx-hero-in">
          <span className="cx-pill cx-hero-tag">Official Microsoft Solutions Partner</span>

          <h1 className="cx-d1 cx-hero-h1">
            Enterprise complexity,
            <br />
            converted into an intelligent core<span className="cx-underscore">_</span>
          </h1>

          <p className="cx-hero-lead">
            Enterprise Microsoft Solutions Partner specialising in Dynamics 365 Business Central
            implementations, NAV-to-Cloud migrations, India GST localisation, agentic AI on the
            Microsoft stack, and 24/7 managed support.
          </p>

          <div className="cx-hero-cta">
            <button className="cx-btn cx-btn-primary" onClick={() => onOpenContact()}>
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

        <div className="cx-hero-foot">
          <div className="cx-wrap cx-hero-foot-in">
            {SPECIALISMS.map((s) => (
              <span key={s} className="cx-hero-foot-item">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="cx-hero-strip">
        <div className="cx-wrap">
          <div className="cx-statrow cx-hero-statrow">
            <div className="cx-st"><b>5-phase</b><span>Delivery framework</span></div>
            <div className="cx-st"><b>2 hubs</b><span>India &amp; Canada delivery</span></div>
            <div className="cx-st"><b>24/7</b><span>Follow-the-sun support</span></div>
            <div className="cx-st"><b>99.9%</b><span>Managed service uptime</span></div>
          </div>
        </div>
        <div className="cx-ticker cx-hero-ticker">
          <div className="cx-ticker-track">
            {[...STACK, ...STACK].map(([src, alt], i) => (
              <div className="cx-ticker-item" key={i}>
                <img src={src} alt={alt} style={{ height: 24, width: "auto" }} />
                <span>{alt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
