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
