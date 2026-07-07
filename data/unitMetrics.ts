/**
 * Synthetic per-unit operational metrics for the Unit Metrics dashboard.
 * New, standalone mock data. This file intentionally does not import from or
 * modify any existing data file. Unit names reuse names already present
 * elsewhere in the app (Orthopedics 7W, Surgical Stepdown, Post-Acute / Rehab,
 * Medicine 4E, Float Pool).
 */

export interface UnitMetric {
  id: string;
  name: string;
  manager: string;
  /** Current occupied beds. */
  census: number;
  /** Licensed / staffed bed capacity. 0 means this is not a bedded unit. */
  bedCapacity: number;
  /** Nurses currently on shift for this unit. */
  nursesStaffed: number;
  expectedDischarges: number;
  expectedAdmissions: number;
  /**
   * When true, a unit manager can submit live updates for this unit in the
   * demo (currently Priya Nair's Orthopedics 7W).
   */
  managerReportable?: boolean;
}

export const baseUnitMetrics: UnitMetric[] = [
  {
    id: "ortho-7w",
    name: "Orthopedics 7W",
    manager: "Priya Nair",
    census: 28,
    bedCapacity: 30,
    nursesStaffed: 6,
    expectedDischarges: 4,
    expectedAdmissions: 6,
    managerReportable: true,
  },
  {
    id: "surgical-stepdown",
    name: "Surgical Stepdown",
    manager: "Daniel Cho",
    census: 18,
    bedCapacity: 22,
    nursesStaffed: 5,
    expectedDischarges: 3,
    expectedAdmissions: 2,
  },
  {
    id: "post-acute-rehab",
    name: "Post-Acute / Rehab",
    manager: "Jordan Patel",
    census: 20,
    bedCapacity: 32,
    nursesStaffed: 4,
    expectedDischarges: 7,
    expectedAdmissions: 2,
  },
  {
    id: "medicine-4e",
    name: "Medicine 4E",
    manager: "Marcus Webb",
    census: 30,
    bedCapacity: 32,
    nursesStaffed: 7,
    expectedDischarges: 5,
    expectedAdmissions: 6,
  },
  {
    id: "float-pool",
    name: "Float Pool",
    manager: "Staffing Office",
    census: 0,
    bedCapacity: 0,
    nursesStaffed: 5,
    expectedDischarges: 0,
    expectedAdmissions: 0,
  },
];

/**
 * Static synthetic AI insights for the dashboard. Written without em dashes.
 */
export const baseUnitInsights: string[] = [
  "Medicine 4E is near capacity at about 94 percent with 6 incoming admissions against only 5 expected discharges. Staffing is tight, so consider pre-assigning a float RN before the evening peak.",
  "Post-Acute / Rehab expects 7 discharges today against 2 admissions, which frees both bed and nurse capacity. It is the strongest redeployment source unit after mid-afternoon.",
  "Orthopedics 7W is running near capacity at about 93 percent with a projected net gain of 2 patients tonight, so its open 2 RN night gap stays the top staffing priority.",
  "Float Pool has 5 RNs available, and today's expected discharges across units should release enough capacity to cover two of the three open gaps.",
];

export function occupancyPct(m: {
  census: number;
  bedCapacity: number;
}): number | null {
  if (!m.bedCapacity) return null;
  return Math.round((m.census / m.bedCapacity) * 100);
}
