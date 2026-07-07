export interface ReportMeta {
  id: string;
  name: string;
  description: string;
  cadence: string;
  lastGenerated: string;
}

export const reports: ReportMeta[] = [
  {
    id: "fill-rate-summary",
    name: "Fill Rate Summary",
    description: "Shift fill rate and time-to-fill trends across all units.",
    cadence: "Weekly",
    lastGenerated: "Today, 6:00 AM",
  },
  {
    id: "overtime-exposure",
    name: "Overtime Exposure Report",
    description: "Overtime hours and risk flags by unit and nurse.",
    cadence: "Weekly",
    lastGenerated: "Yesterday, 6:00 AM",
  },
  {
    id: "competency-coverage",
    name: "Competency Coverage Report",
    description: "Readiness levels across required competencies by unit.",
    cadence: "Monthly",
    lastGenerated: "3 days ago",
  },
  {
    id: "redeployment-outcomes",
    name: "Redeployment Outcomes",
    description: "Outcome ratings and near-miss training gaps from past redeployments.",
    cadence: "Monthly",
    lastGenerated: "1 week ago",
  },
];
