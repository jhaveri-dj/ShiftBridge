import type { Competency, Nurse } from "@/data/types";

/**
 * Competencies treated as required for redeployment into Orthopedics 7W.
 * Unit orientation isn't in the request's formal requiredCompetencies list
 * but is what actually blocks assignment (see Marcus Webb), so it's folded
 * in here for eligibility purposes.
 */
export const REQUIRED_FOR_ORTHO = [
  "Post-op ortho care",
  "Wound care",
  "Falls prevention",
  "VTE prophylaxis",
  "Epic documentation",
  "Unit orientation — 7W",
];

export type EligibilityLevel = "eligible" | "conditional" | "blocked";

export interface EligibilityVerdict {
  level: EligibilityLevel;
  label: string;
}

const CAVEAT_TEXT: Record<string, string> = {
  "VTE prophylaxis": "VTE prophylaxis refresher due, not blocking",
  "Unit orientation — 7W": "unit orientation refresher recommended, not blocking",
  "Falls prevention": "falls prevention refresher due, not blocking",
  "Post-op ortho care": "post-op ortho care refresher due, not blocking",
  "Epic documentation": "Epic documentation refresher due, not blocking",
  "Wound care": "wound care refresher due, not blocking",
};

const BLOCK_TEXT: Record<string, string> = {
  "Unit orientation — 7W": "unit orientation lapsed",
  "Post-op ortho care": "post-op ortho care not current",
  "VTE prophylaxis": "VTE prophylaxis not current",
  "Falls prevention": "falls prevention not current",
  "Epic documentation": "Epic documentation not current",
  "Wound care": "wound care not current",
};

export function computeEligibility(
  nurse: Nurse,
  requiredNames: string[] = REQUIRED_FOR_ORTHO,
): EligibilityVerdict {
  const required = nurse.competencies.filter((c) => requiredNames.includes(c.name));

  const blocking = required.find((c) => c.status === "not-eligible");
  if (blocking) {
    return {
      level: "blocked",
      label: `Not eligible — ${BLOCK_TEXT[blocking.name] ?? `${blocking.name} not current`}`,
    };
  }

  const dueNotBlocking = required.find((c) => c.status === "refresher");
  if (dueNotBlocking) {
    return {
      level: "conditional",
      label: `Eligible with condition — ${CAVEAT_TEXT[dueNotBlocking.name] ?? `${dueNotBlocking.name} refresher due, not blocking`}`,
    };
  }

  return { level: "eligible", label: "Eligible for tonight's shift" };
}

/** Required competencies sorted so a blocking one always outranks the rest. */
export function sortRequiredCompetencies(
  competencies: Competency[],
  requiredNames: string[] = REQUIRED_FOR_ORTHO,
): Competency[] {
  const rank: Record<Competency["status"], number> = {
    "not-eligible": 0,
    refresher: 1,
    current: 2,
  };
  return competencies
    .filter((c) => requiredNames.includes(c.name))
    .sort((a, b) => rank[a.status] - rank[b.status]);
}

export function competencyLabel(
  competency: Competency,
  required: boolean,
): string {
  if (!required) {
    return competency.status === "current"
      ? "Current"
      : competency.status === "refresher"
        ? "Refresher recommended"
        : "Not eligible";
  }
  if (competency.status === "current") return "Required — current";
  if (competency.status === "refresher") return "Recommended — refresher due";
  return "Required — not current (blocks assignment)";
}

/** Extracts "11 days ago" out of a "Orthopedics 7W — 11 days ago" style string. */
export function extractRecency(lastRelevantShift: string): string | null {
  const parts = lastRelevantShift.split("—");
  return parts.length > 1 ? parts[1].trim() : null;
}

export interface GapInfo {
  effort: string;
  ctaLabel: string;
  ctaType: "training" | "signoff";
}

/** Effort/CTA to close a non-current competency, generic across any nurse. */
const GAP_INFO: Record<string, GapInfo> = {
  "VTE prophylaxis": {
    effort: "~20 min online module",
    ctaLabel: "Start this training",
    ctaType: "training",
  },
  "Unit orientation — 7W": {
    effort: "~2 hr shadow shift",
    ctaLabel: "Schedule orientation",
    ctaType: "training",
  },
  "Falls prevention": {
    effort: "~15 min online module",
    ctaLabel: "Start this training",
    ctaType: "training",
  },
  "Post-op ortho care": {
    effort: "~30 min online module",
    ctaLabel: "Start this training",
    ctaType: "training",
  },
  "Epic documentation": {
    effort: "~20 min online module",
    ctaLabel: "Start this training",
    ctaType: "training",
  },
  "Wound care": {
    effort: "~25 min online module",
    ctaLabel: "Start this training",
    ctaType: "training",
  },
  "Charge nurse readiness": {
    effort: "Requires manager sign-off after next shift",
    ctaLabel: "Request sign-off",
    ctaType: "signoff",
  },
};

const BLOCKED_GAP_INFO: Record<string, GapInfo> = {
  "Unit orientation — 7W": {
    effort: "Requires a 2 hr shadow shift plus manager sign-off",
    ctaLabel: "Request sign-off",
    ctaType: "signoff",
  },
};

export function getGapInfo(name: string, blocked: boolean): GapInfo {
  if (blocked) {
    return (
      BLOCKED_GAP_INFO[name] ?? {
        effort: "Requires manager sign-off",
        ctaLabel: "Request sign-off",
        ctaType: "signoff",
      }
    );
  }
  return (
    GAP_INFO[name] ?? {
      effort: "~20 min online module",
      ctaLabel: "Start this training",
      ctaType: "training",
    }
  );
}

/** Plain-language framing of a competency gap for nurse-facing checklists. */
export function gapFramingText(competency: Competency, required: boolean): string {
  if (competency.status === "not-eligible") {
    return required
      ? `Required for this shift and not current — this blocks assignment until resolved.`
      : `Not current. Not required for this shift, but recommended.`;
  }
  return required
    ? `Required for this shift; refresher due, but won't block you from taking it.`
    : `Not required for this shift, but recommended.`;
}
