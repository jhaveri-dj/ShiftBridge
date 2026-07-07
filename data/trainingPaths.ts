export interface TrainingPath {
  id: string;
  name: string;
  category: string;
  duration: string;
  eligibleNurseCount: number;
  matchPoolImpact: string;
  description: string;
}

export const trainingPaths: TrainingPath[] = [
  {
    id: "vte-prophylaxis-refresher",
    name: "VTE Prophylaxis Refresher",
    category: "Clinical Care",
    duration: "45 min self-paced",
    eligibleNurseCount: 6,
    matchPoolImpact: "+2 qualified matches for Orthopedics 7W",
    description:
      "Refreshes mechanical and pharmacological VTE prevention protocols for post-op orthopedic patients.",
  },
  {
    id: "unit-orientation-7w",
    name: "Unit Orientation — Orthopedics 7W",
    category: "Unit Readiness",
    duration: "2 hr shadow shift",
    eligibleNurseCount: 4,
    matchPoolImpact: "+3 qualified matches for Orthopedics 7W",
    description:
      "Hands-on orientation to 7W workflows, equipment, and care team structure for redeployable nurses.",
  },
  {
    id: "epic-documentation-essentials",
    name: "Epic Documentation Essentials",
    category: "Documentation",
    duration: "30 min self-paced",
    eligibleNurseCount: 5,
    matchPoolImpact: "+2 qualified matches across Medicine 4E and Orthopedics 7W",
    description:
      "Covers unit-specific charting requirements and discharge documentation standards in Epic.",
  },
  {
    id: "charge-readiness",
    name: "Charge Nurse Readiness",
    category: "Professional Practice",
    duration: "4 hr cohort course",
    eligibleNurseCount: 3,
    matchPoolImpact: "Expands float pool leadership coverage",
    description:
      "Prepares experienced float and staff RNs to take charge shifts across multiple units.",
  },
];
