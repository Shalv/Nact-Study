import React from "react";
import { ArrowRight } from "lucide-react";
import { PageType } from "../types";
import { COREENACT_CONTACT } from "../data/coreenactData";

interface FooterProps {
  /** A page name or a catalog detail path such as /services/erp-audit. */
  onNavigate?: (target: PageType | string) => void;
  onOpenContact?: () => void;
}

const PRACTICE: Array<[PageType, string]> = [
  ["solutions", "Solutions"],
  ["services", "Services"],
  ["ai-agents", "AI & Agents"],
  ["industries", "Industries"],
  ["digital-marketing", "Digital Marketing"],
];

const COMPANY: Array<[PageType, string]> = [
  ["about", "About"],
  ["case-studies", "Case Studies"],
  ["resources", "Resources"],
  ["contact", "Contact"],
  ["privacy-policy", "Privacy Policy"],
];

/**
 * Logic-style footer: a near-black canvas, an oversized Anton call to action
 * flecked with lime shapes, then brand, three link columns, offices and a
 * legal bar.
 */
export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const go = (page: PageType) => {
    onNavigate?.(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const c = COREENACT_CONTACT;

  return (
    <footer className="cx-foot">
      <div className="cx-wrap">
        <div className="cx-foot-cta">
          <div className="cx-foot-shapes" aria-hidden>
            <span /><span /><span /><span />
          </div>
          <h2>
            Let&rsquo;s build your
            <br />
            intelligent core<span className="cx-underscore">_</span>
          </h2>
          <p>
            Tell us where the business needs to get to. We&rsquo;ll map the Dynamics 365
            Business Central, data and AI path to get you there — and stay with you once it is live.
          </p>
          <button className="cx-btn cx-btn-primary" onClick={() => (onOpenContact ? onOpenContact() : go("contact"))}>
            Book a consultation <ArrowRight />
          </button>
        </div>

        <div className="cx-foot-top">
          <div className="cx-foot-brand">
            <img src="/coreenact-logo-light.png" alt="Coreenact Solutions" />
            <p>
              {c.tagline}. Official Microsoft Solutions Partner for Dynamics 365 Business Central —
              delivery hubs in Haryana, India and Mississauga, Canada.
            </p>
            <div className="cx-pillrow cx-mt-m">
              <span className="cx-pill">{c.email}</span>
              <span className="cx-pill">{c.phone}</span>
            </div>
          </div>

          <div className="cx-foot-col">
            <h4>Practice</h4>
            {PRACTICE.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
          </div>

          <div className="cx-foot-col">
            <h4>Company</h4>
            {COMPANY.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
          </div>

          <div className="cx-foot-col">
            <h4>Offices</h4>
            <button onClick={() => go("contact")}>Haryana, India</button>
            <button onClick={() => go("contact")}>Mississauga, Canada</button>
            <a href={c.socials.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={c.socials.youtube} target="_blank" rel="noopener">YouTube</a>
          </div>
        </div>

        <div className="cx-foot-bar">
          <span>© {new Date().getFullYear()} Coreenact Solutions Pvt. Ltd. — All rights reserved.</span>
          <div className="cx-foot-socials">
            <a href={c.socials.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={c.socials.x} target="_blank" rel="noopener">X</a>
            <a href={c.socials.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={c.socials.youtube} target="_blank" rel="noopener">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
