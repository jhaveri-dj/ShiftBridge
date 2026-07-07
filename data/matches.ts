import { MatchRow } from "./types";
import { requests } from "./requests";

export function getMatchesForRequest(requestId: string): MatchRow[] {
  const request = requests.find((r) => r.id === requestId);
  return request?.matches ?? [];
}

export const rankingFactors = [
  "Availability",
  "Unit experience",
  "Competency fit",
  "Training status",
  "Home-unit pressure",
  "Overtime risk",
];
