import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SOLUTION_PILLARS } from "../data/coreenactData";
import { PILLAR_BANNER_IMAGES } from "../data/solutionsMeta";

interface SolutionPillarsProps {
  onOpenPillar: (id: string) => void;
}

/**
 * Solution pillars — image-led card grid.
 *
 * This replaces the earlier hairline numbered list. Each pillar is now a card
 * carrying its own banner image, the running index in lime, the badge, the
 * title and the capability count, so the six pillars read as six destinations
 * rather than six rows of text. The number, the hover lift and the lime arrow
 * keep it in the Logic language, and the whole card is one button so the hit
 * target matches what it looks like.
 */
export const SolutionPillars: React.FC<SolutionPillarsProps> = ({ onOpenPillar }) => {
  return (
    <section id="solutions" className="cx-section">
      <div className="cx-wrap">
        <div className="cx-split cx-split-top">
          <div>
            <span className="cx-eyebrow">Solution pillars</span>
            <h2 className="cx-d2 cx-mt-m">
              More possibilities.
              <br />
              Always your control<span className="cx-underscore">_</span>
            </h2>
          </div>
          <div>
            <p className="cx-lead">
              Six pillars cover the full arc of an enterprise ERP programme — core
              operations, data and insight, global scale, governance, agentic AI and a
              flagship education platform.
            </p>
          </div>
        </div>

        <div className="cx-pillars cx-mt-l">
          {SOLUTION_PILLARS.map((pillar, i) => {
            const image = PILLAR_BANNER_IMAGES[pillar.id];
            return (
              <button
                key={pillar.id}
                type="button"
                className="cx-pillar"
                onClick={() => onOpenPillar(pillar.id)}
                aria-label={`${pillar.title} — ${pillar.subtitle}`}
              >
                <span className="cx-pillar-media" aria-hidden>
                  {image && <img src={image} alt="" loading="lazy" decoding="async" />}
                  <span className="cx-pillar-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cx-pillar-badge">{pillar.badge}</span>
                </span>

                <span className="cx-pillar-body">
                  <span className="cx-pillar-title">{pillar.title}</span>
                  <span className="cx-pillar-sub">{pillar.subtitle}</span>
                  <span className="cx-pillar-foot">
                    <span>
                      {pillar.items.length} {pillar.items.length === 1 ? "capability" : "capabilities"}
                    </span>
                    <span className="cx-pillar-arrow" aria-hidden>
                      <ArrowUpRight />
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionPillars;
