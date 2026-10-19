import React from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenContact: (interest?: string) => void;
}

const META = [
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

// Floating square tiles, echoing the Logic home hero's orbiting imagery.
const FIGS = [
  "/images/copilot_dynamics_business_central_1790325891460.jpg",
  "/images/indian_enterprise_team_1790050320734.jpg",
];

/**
 * Editorial hero: near-black canvas, oversized tracked display headline, a
 * hairline meta row, the practice summary and two calls to action. The previous
 * interactive blueprint simulator is retired in favour of this typographic
 * opening; the certified-practices ticker survives as the Microsoft stack strip.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="cx-hero">
      <div className="cx-hero-figs" aria-hidden>
        {FIGS.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" />
        ))}
      </div>

      <div className="cx-wrap cx-hero-in">
        <div className="cx-pillrow">
          <span className="cx-pill" style={{ letterSpacing: ".14em", textTransform: "uppercase", fontSize: 11.5 }}>
            Official Microsoft Solutions Partner
          </span>
        </div>

        <h1 className="cx-d1">
          Enterprise complexity,
          <br />
          converted into an intelligent core<span className="cx-underscore">_</span>
        </h1>

        <div className="cx-hero-meta">
          {META.map((m, i) => (
            <React.Fragment key={m}>
              <span>{m}</span>
              {i < META.length - 1 && (
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c8db53" }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="cx-hero-body">
          <div>
            <p className="cx-lead">
              Enterprise Microsoft Solutions Partner specialising in Microsoft Dynamics 365 Business
              Central implementations, NAV-to-Cloud migrations, India GST localization, agentic AI on
              the Microsoft stack, and 24/7 managed support.
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
          <div>
            <p className="cx-small" style={{ color: "#b8b8b8" }}>
              A business consulting and digital transformation partner helping mid-market and
              enterprise organisations translate strategic ambition into operational results — across
              ERP modernisation, data and AI, and continuous managed care.
            </p>
          </div>
        </div>

        <div className="cx-statrow cx-mt-l">
          <div className="cx-st"><b>5-phase</b><span>Delivery framework</span></div>
          <div className="cx-st"><b>2 hubs</b><span>India &amp; Canada delivery</span></div>
          <div className="cx-st"><b>24/7</b><span>Follow-the-sun support</span></div>
          <div className="cx-st"><b>99.9%</b><span>Managed service uptime</span></div>
        </div>
      </div>

      <div className="cx-ticker" style={{ marginTop: "clamp(40px,6vw,72px)", borderColor: "rgba(255,255,255,.12)", background: "transparent" }}>
        <div className="cx-ticker-track">
          {[...STACK, ...STACK].map(([src, alt], i) => (
            <div className="cx-ticker-item" key={i} style={{ color: "#b4b4b4" }}>
              <img src={src} alt={alt} style={{ height: 24, width: "auto" }} />
              <span>{alt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
