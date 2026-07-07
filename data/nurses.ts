import { Nurse } from "./types";

export const nurses: Nurse[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Float Pool RN",
    homeUnit: "Float Pool",
    yearsExperience: 6,
    availability: "Available tonight, 7PM–7AM",
    matchScore: 92,
    floatEligible: true,
    overtimeRisk: "Low",
    ehrStatus: "Certified",
    lastRelevantShift: "Orthopedics 7W — 11 days ago",
    approvalRequired: "Float Pool lead (auto-eligible)",
    competencies: [
      { name: "Post-op ortho care", status: "current", category: "Clinical Care", level: 95 },
      { name: "Wound care", status: "current", category: "Clinical Care", level: 90 },
      { name: "Falls prevention", status: "current", category: "Clinical Care", level: 88 },
      { name: "VTE prophylaxis", status: "current", category: "Clinical Care", level: 92 },
      { name: "Epic documentation", status: "current", category: "Documentation", level: 96 },
      { name: "Unit orientation — 7W", status: "current", category: "Unit Readiness", level: 85 },
      { name: "Charge nurse readiness", status: "refresher", category: "Professional Practice", level: 60 },
    ],
    matchReasons: [
      "Float Pool assignment — no home-unit pressure or sending-manager approval needed.",
      "Worked Orthopedics 7W within the last two weeks; current on unit workflows.",
      "All five required competencies for this request are current, not just eligible.",
      "Zero overtime hours logged this pay period — no fatigue or overtime-risk flags.",
    ],
    managerNote: {
      quote:
        "Alex is one of our most reliable float nurses for ortho coverage — picks up unit routines fast and charge nurses ask for them by name.",
      author: "Priya Nair, Unit Manager, Orthopedics 7W",
    },
    redeploymentHistory: [
      { unit: "Orthopedics 7W", date: "3 weeks ago", outcome: "Successful", rating: 5 },
      { unit: "Medicine 4E", date: "6 weeks ago", outcome: "Successful", rating: 5 },
      { unit: "Surgical Stepdown", date: "2 months ago", outcome: "Successful", rating: 4 },
      { unit: "Orthopedics 7W", date: "3 months ago", outcome: "Successful", rating: 5 },
      { unit: "Oncology Day Unit", date: "4 months ago", outcome: "Partial", rating: 3 },
      { unit: "Medicine 4E", date: "5 months ago", outcome: "Successful", rating: 4 },
    ],
  },
  {
    id: "jordan-patel",
    name: "Jordan Patel",
    role: "Staff RN",
    homeUnit: "Post-Acute / Rehab",
    yearsExperience: 4,
    availability: "Available after 9PM, if census stable",
    matchScore: 87,
    floatEligible: false,
    overtimeRisk: "Low",
    ehrStatus: "Certified",
    lastRelevantShift: "Orthopedics 7W — 2 months ago",
    approvalRequired: "Sending unit manager (Jordan Patel, Post-Acute/Rehab)",
    competencies: [
      { name: "Post-op ortho care", status: "current", category: "Clinical Care", level: 82 },
      { name: "Wound care", status: "current", category: "Clinical Care", level: 90 },
      { name: "Falls prevention", status: "current", category: "Clinical Care", level: 84 },
      { name: "VTE prophylaxis", status: "refresher", category: "Clinical Care", level: 55 },
      { name: "Epic documentation", status: "current", category: "Documentation", level: 88 },
      { name: "Unit orientation — 7W", status: "refresher", category: "Unit Readiness", level: 58 },
    ],
    matchReasons: [
      "Home unit (Post-Acute/Rehab) has confirmed available capacity tonight.",
      "Strong wound care and falls prevention competency scores.",
      "VTE prophylaxis flagged for a refresher — near-miss, not disqualifying.",
    ],
    managerNote: {
      quote:
        "Jordan is dependable and has covered ortho before. A short VTE refresher would make this a clean match going forward.",
      author: "Jordan Patel's unit lead",
    },
    redeploymentHistory: [
      { unit: "Orthopedics 7W", date: "2 months ago", outcome: "Successful", rating: 4 },
      { unit: "Medicine 4E", date: "4 months ago", outcome: "Successful", rating: 4 },
      { unit: "Surgical Stepdown", date: "5 months ago", outcome: "Partial", rating: 3 },
      { unit: "Orthopedics 7W", date: "7 months ago", outcome: "Successful", rating: 4 },
    ],
  },
  {
    id: "emily-roberts",
    name: "Emily Roberts",
    role: "Staff RN",
    homeUnit: "Surgical Stepdown",
    yearsExperience: 8,
    availability: "Available for overtime shift, 7PM–7AM",
    matchScore: 78,
    floatEligible: false,
    overtimeRisk: "Medium",
    ehrStatus: "Certified",
    lastRelevantShift: "Orthopedics 7W — 5 months ago",
    approvalRequired: "Sending unit manager (Surgical Stepdown)",
    competencies: [
      { name: "Post-op ortho care", status: "current", category: "Clinical Care", level: 80 },
      { name: "Wound care", status: "current", category: "Clinical Care", level: 85 },
      { name: "Falls prevention", status: "refresher", category: "Clinical Care", level: 62 },
      { name: "VTE prophylaxis", status: "current", category: "Clinical Care", level: 78 },
      { name: "Epic documentation", status: "current", category: "Documentation", level: 90 },
      { name: "Unit orientation — 7W", status: "refresher", category: "Unit Readiness", level: 50 },
    ],
    matchReasons: [
      "Solid post-op and wound care competency base from Surgical Stepdown.",
      "Would require overtime — already logged 6 OT hours this pay period.",
      "Longer gap since last 7W shift; unit orientation refresher recommended.",
    ],
    managerNote: {
      quote:
        "Emily is clinically strong but this would be her second overtime shift this week — worth watching for fatigue.",
      author: "Surgical Stepdown charge nurse",
    },
    redeploymentHistory: [
      { unit: "Orthopedics 7W", date: "5 months ago", outcome: "Successful", rating: 4 },
      { unit: "Medicine 4E", date: "6 months ago", outcome: "Partial", rating: 3 },
      { unit: "Oncology Day Unit", date: "8 months ago", outcome: "Successful", rating: 4 },
      { unit: "Orthopedics 7W", date: "10 months ago", outcome: "Successful", rating: 5 },
    ],
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    role: "Staff RN",
    homeUnit: "Medicine 4E",
    yearsExperience: 3,
    availability: "Available tonight, 7PM–7AM",
    matchScore: 74,
    floatEligible: false,
    overtimeRisk: "High",
    ehrStatus: "Refresher recommended",
    lastRelevantShift: "Orthopedics 7W — 9 months ago",
    approvalRequired: "Sending unit manager (Medicine 4E) — home unit is also short-staffed",
    competencies: [
      { name: "Post-op ortho care", status: "refresher", category: "Clinical Care", level: 58 },
      { name: "Wound care", status: "current", category: "Clinical Care", level: 75 },
      { name: "Falls prevention", status: "current", category: "Clinical Care", level: 80 },
      { name: "VTE prophylaxis", status: "refresher", category: "Clinical Care", level: 52 },
      { name: "Epic documentation", status: "refresher", category: "Documentation", level: 65 },
      { name: "Unit orientation — 7W", status: "not-eligible", category: "Unit Readiness", level: 30 },
    ],
    matchReasons: [
      "Available tonight but home unit (Medicine 4E) has its own open gap.",
      "Post-op ortho and VTE prophylaxis competencies need a refresher.",
      "Already carrying high overtime risk this pay period.",
    ],
    managerNote: {
      quote:
        "Marcus is a strong med-surg nurse but pulling him tonight would just move the shortage to Medicine 4E.",
      author: "Marcus Webb's unit lead",
    },
    redeploymentHistory: [
      { unit: "Orthopedics 7W", date: "9 months ago", outcome: "Partial", rating: 3 },
      { unit: "Oncology Day Unit", date: "11 months ago", outcome: "Successful", rating: 4 },
      { unit: "Surgical Stepdown", date: "1 year ago", outcome: "Cancelled", rating: 2 },
      { unit: "Emergency Department", date: "1 year ago", outcome: "Successful", rating: 4 },
    ],
  },
];

export function getNurseById(id: string): Nurse | undefined {
  return nurses.find((n) => n.id === id);
}
