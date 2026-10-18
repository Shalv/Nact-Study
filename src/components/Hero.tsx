import React from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenContact: (interest?: string) => void;
};

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

const HERO_BG = "/images/enterprise_consulting_team_1790047798645.jpg";

/**
 * Hero — built to the roomandpillar.com home hero.
 *
 * A full-viewport band: a photographic background washed in deep blue (#075986)
 * with a dot field over it, and a single left-aligned copy column capped at
 * 650px — a large, light, sentence-case heading; a short yellow (#fff200) dash
 * beneath it; a 22px light paragraph; a row of chips; and a pill CTA. The
 * Microsoft stack marquee and the proof-point row sit in a strip under it.
 *
 * The heading deliberately drops the theme's uppercase Anton treatment: the
 * reference sets its hero in a light sentence-case sans, and the hero reads
 * wrong in condensed caps.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <>
      <section className="cx-hero">
        <div
          className="cx-hero-media"
          aria-hidden
          style={{ backgroundImage: `url("${HERO_BG}")` }}
        />
        <div className="cx-hero-pattern" aria-hidden />

        <div className="cx-wrap cx-hero-in">
          <div className="cx-hero-copy">
            <h1 className="cx-hero-title">
              Converting enterprise complexity into an intelligent core
            </h1>

            <span className="cx-hero-dash" aria-hidden />

            <p className="cx-hero-sub">
              A Microsoft Solutions Partner specialising in Dynamics 365 Business Central
              implementations, NAV-to-Cloud migrations, India GST localisation, agentic AI on the
              Microsoft stack and 24/7 managed support.
            </p>

            <div className="cx-hero-chips">
              <span className="cx-hero-chip">Dynamics 365 Business Central</span>
              <span className="cx-hero-chip">Agentic AI on the Microsoft Cloud</span>
              <span className="cx-hero-chip">24/7 Managed Support</span>
            </div>

            <div className="cx-hero-actions">
              <button className="cx-hero-cta" onClick={() => onOpenContact()}>
                Book a consultation
              </button>
              <a
                className="cx-hero-ghost"
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
