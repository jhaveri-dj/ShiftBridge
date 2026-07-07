export type StatusLevel = "good" | "warning" | "critical";

export type UnitStatus =
  | "critical-shortage"
  | "at-risk"
  | "stable"
  | "available-capacity";

export type FillRisk = "low" | "medium" | "high";

export type CompetencyStatus = "current" | "refresher" | "not-eligible";

export interface Competency {
  name: string;
  status: CompetencyStatus;
  category: "Clinical Care" | "Documentation" | "Unit Readiness" | "Professional Practice";
  level?: number; // 0-100, readiness percentage
}

export interface Unit {
  id: string;
  name: string;
  status: UnitStatus;
  statusLabel: string;
  shiftNeed: string;
  acuity: string;
  patientPopulation: string;
  requiredCompetencies: string[];
  qualifiedMatches: number;
  fillRisk: FillRisk;
  manager: string;
  gapCount: number;
  note?: string;
}

export interface Nurse {
  id: string;
  name: string;
  role: string;
  homeUnit: string;
  yearsExperience: number;
  availability: string;
  matchScore?: number;
  floatEligible: boolean;
  overtimeRisk: "Low" | "Medium" | "High";
  ehrStatus: "Certified" | "Refresher recommended" | "Not certified";
  lastRelevantShift: string;
  approvalRequired: string;
  competencies: Competency[];
  matchReasons: string[];
  managerNote: {
    quote: string;
    author: string;
  };
  redeploymentHistory: {
    unit: string;
    date: string;
    outcome: "Successful" | "Partial" | "Cancelled";
    rating: number; // 1-5
  }[];
}

export interface MatchRow {
  nurseId: string;
  nurseName: string;
  homeUnit: string;
  availability: string;
  matchScore: number;
  keyCompetencies: string[];
  riskFlags: string[];
  approvalStatus: "Pending" | "Approved" | "Declined" | "Awaiting sending unit";
}

export interface StaffingRequest {
  id: string;
  unitId: string;
  unitName: string;
  shiftNeed: string;
  acuity: string;
  patientPopulation: string;
  requestOwner: string;
  status: string;
  gapSeverity: FillRisk;
  matchConfidence: number;
  qualifiedMatchCount: number;
  estTimeToFill: string;
  overtimeRisk: "Low" | "Medium" | "High";
  homeUnitPressure: "Low" | "Medium" | "High";
  createdAt: string;
  requiredCompetencies: { name: string; required: boolean }[];
  currentStep: number; // index into lifecycle steps
  matches: MatchRow[];
}

export interface ThreadMessage {
  id: string;
  author: string;
  role: string;
  isSystem?: boolean;
  timestamp: string;
  body: string;
}

export interface MessageThread {
  id: string;
  subject: string;
  unitName: string;
  participants: string[];
  messages: ThreadMessage[];
}
