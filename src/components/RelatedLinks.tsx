import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface RelatedLink {
  label: string;
  sub?: string;
  onClick: () => void;
}

interface RelatedLinksProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  links: RelatedLink[];
}

/**
 * Cross-page "related links" rail.
 *
 * The catalogues already link up and down themselves (a service points at its
 * siblings), but nothing joined one catalogue to another. Every top-level page
 * ends with this block so a visitor — and a crawler — can move sideways through
 * the site: Services points at Industries and Case Studies, Industries back at
 * Services and Solutions, and so on. Links resolve through the same in-app
 * navigation the nav bar uses, so they never trigger a full page reload.
 */
export const RelatedLinks: React.FC<RelatedLinksProps> = ({
  eyebrow = "Related",
  title = "Related pages",
  intro,
  links,
}) => {
  if (!links.length) return null;

  return (
    <section className="cx-section cx-cream">
      <div className="cx-wrap">
        <div className="cx-split cx-split-top">
          <div>
            <span className="cx-eyebrow">{eyebrow}</span>
            <h2 className="cx-d2 cx-mt-m">
              {title}
              <span className="cx-underscore">_</span>
            </h2>
          </div>
          <div>
            <p className="cx-lead">
              {intro ??
                "Keep exploring the Coreenact practice — these are the pages visitors most often open next."}
            </p>
          </div>
        </div>

        <div className="cx-grid cx-grid-3 cx-mt-l">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={link.onClick}
              className="cx-cell"
              style={{ textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit" }}
            >
              <h3>{link.label}</h3>
              {link.sub && <p>{link.sub}</p>}
              <span className="cx-link" style={{ marginTop: "auto" }}>
                Open <ArrowUpRight />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
