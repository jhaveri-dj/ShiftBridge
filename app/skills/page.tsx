"use client";

import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FilterSelect } from "@/components/skill-select";
import { CompetencyBar } from "@/components/competency-bar";
import { MatchScorePill } from "@/components/match-score-card";
import { EligibilityVerdictLine } from "@/components/eligibility-verdict";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nurses } from "@/data/nurses";
import { getRequestByUnitId } from "@/data/requests";
import { cn } from "@/lib/utils";
import type { CompetencyStatus } from "@/data/types";
import {
  computeEligibility,
  sortRequiredCompetencies,
  extractRecency,
  REQUIRED_FOR_ORTHO,
  competencyLabel,
} from "@/lib/eligibility";

const STATUS_CLASS: Record<CompetencyStatus, string> = {
  current: "text-good",
  refresher: "text-warning",
  "not-eligible": "text-critical",
};

function shiftWindow(availability: string): string {
  const lower = availability.toLowerCase();
  if (lower.includes("overtime")) return "Overtime shift";
  if (lower.includes("after 9pm")) return "After 9PM";
  if (lower.includes("tonight")) return "Tonight, 7PM–7AM";
  return "Other";
}

const UNIT_OPTIONS = ["All units", ...Array.from(new Set(nurses.map((n) => n.homeUnit)))];
const ROLE_OPTIONS = ["All roles", ...Array.from(new Set(nurses.map((n) => n.role)))];
const SHIFT_OPTIONS = [
  "All shifts",
  ...Array.from(new Set(nurses.map((n) => shiftWindow(n.availability)))),
];
const REQUIREMENT_OPTIONS = ["All requirements", "Required", "Preferred"];

const orthoRequest = getRequestByUnitId("ortho-7w")!;
const COMPARISON_COMPETENCIES = orthoRequest.requiredCompetencies.map((c) => c.name);

export default function SkillsPage() {
  const [unitFilter, setUnitFilter] = useState(UNIT_OPTIONS[0]);
  const [roleFilter, setRoleFilter] = useState(ROLE_OPTIONS[0]);
  const [shiftFilter, setShiftFilter] = useState(SHIFT_OPTIONS[0]);
  const [requirementFilter, setRequirementFilter] = useState(REQUIREMENT_OPTIONS[0]);

  const filteredNurses = nurses.filter((nurse) => {
    if (unitFilter !== UNIT_OPTIONS[0] && nurse.homeUnit !== unitFilter) return false;
    if (roleFilter !== ROLE_OPTIONS[0] && nurse.role !== roleFilter) return false;
    if (shiftFilter !== SHIFT_OPTIONS[0] && shiftWindow(nurse.availability) !== shiftFilter)
      return false;
    return true;
  });

  const visibleCompetencyColumns = COMPARISON_COMPETENCIES.filter((name) => {
    if (requirementFilter === "All requirements") return true;
    const req = orthoRequest.requiredCompetencies.find((c) => c.name === name);
    if (requirementFilter === "Required") return req?.required === true;
    return req?.required === false;
  });

  return (
    <AppShell breadcrumbs={[{ label: "Skills Repository" }]}>
      <PageHeader
        title="Skills Repository"
        subtitle="Competency readiness across units, roles, and redeployment pathways."
      />

      <div className="mb-6 flex flex-wrap gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <FilterSelect
          label="Unit"
          options={UNIT_OPTIONS}
          value={unitFilter}
          onChange={setUnitFilter}
        />
        <FilterSelect
          label="Role"
          options={ROLE_OPTIONS}
          value={roleFilter}
          onChange={setRoleFilter}
        />
        <FilterSelect
          label="Shift"
          options={SHIFT_OPTIONS}
          value={shiftFilter}
          onChange={setShiftFilter}
        />
        <FilterSelect
          label="Requirement type"
          options={REQUIREMENT_OPTIONS}
          value={requirementFilter}
          onChange={setRequirementFilter}
        />
        {(unitFilter !== UNIT_OPTIONS[0] ||
          roleFilter !== ROLE_OPTIONS[0] ||
          shiftFilter !== SHIFT_OPTIONS[0]) && (
          <button
            type="button"
            onClick={() => {
              setUnitFilter(UNIT_OPTIONS[0]);
              setRoleFilter(ROLE_OPTIONS[0]);
              setShiftFilter(SHIFT_OPTIONS[0]);
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      <p className="mb-4 text-xs text-muted-foreground">
        Showing {filteredNurses.length} of {nurses.length} nurses.
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredNurses.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No nurses match the selected filters.
          </p>
        ) : (
          filteredNurses.map((nurse) => {
            const verdict = computeEligibility(nurse);
            const requiredComps = sortRequiredCompetencies(nurse.competencies);
            const otherComps = nurse.competencies.filter(
              (c) => !REQUIRED_FOR_ORTHO.includes(c.name),
            );
            const recency = extractRecency(nurse.lastRelevantShift);

            return (
              <div key={nurse.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{nurse.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {nurse.role} · {nurse.homeUnit}
                    </p>
                  </div>
                  {nurse.matchScore && <MatchScorePill score={nurse.matchScore} />}
                </div>

                <EligibilityVerdictLine verdict={verdict} className="mb-4" />

                <div className="space-y-2.5">
                  {requiredComps.map((c) => (
                    <CompetencyBar
                      key={c.name}
                      name={c.name}
                      status={c.status}
                      level={c.level}
                      required
                      recency={c.status === "current" ? recency : undefined}
                    />
                  ))}
                </div>

                {otherComps.length > 0 && (
                  <>
                    <p className="mb-2 mt-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Other / growth competencies
                    </p>
                    <div className="space-y-2.5">
                      {otherComps.map((c) => (
                        <CompetencyBar key={c.name} name={c.name} status={c.status} level={c.level} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mb-6 overflow-x-auto rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Nurse comparison — Orthopedics 7W competencies
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nurse</TableHead>
              {visibleCompetencyColumns.map((c) => (
                <TableHead key={c}>{c}</TableHead>
              ))}
              <TableHead>Match score</TableHead>
              <TableHead>Training gap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNurses.map((nurse) => {
              const gapCount = nurse.competencies.filter((c) => c.status !== "current").length;
              return (
                <TableRow key={nurse.id}>
                  <TableCell className="font-medium text-foreground">{nurse.name}</TableCell>
                  {visibleCompetencyColumns.map((name) => {
                    const comp = nurse.competencies.find((c) => c.name === name);
                    return (
                      <TableCell
                        key={name}
                        className={cn(
                          "whitespace-nowrap",
                          comp ? STATUS_CLASS[comp.status] : "text-muted-foreground",
                        )}
                      >
                        {comp ? competencyLabel(comp, true) : "—"}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {nurse.matchScore ? <MatchScorePill score={nurse.matchScore} /> : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {gapCount === 0 ? "None" : `${gapCount} competenc${gapCount === 1 ? "y" : "ies"}`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Training recommendations
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredNurses.map((nurse) => {
            const gaps = nurse.competencies.filter((c) => c.status !== "current");
            return (
              <div key={nurse.id} className="rounded-xl bg-muted/60 p-4">
                <p className="text-sm font-semibold text-foreground">{nurse.name}</p>
                <ul className="mt-2 space-y-1.5">
                  {gaps.length === 0 ? (
                    <li className="text-sm text-muted-foreground">
                      No outstanding training gaps — fully current on all tracked competencies.
                    </li>
                  ) : (
                    gaps.slice(0, 3).map((g) => (
                      <li key={g.name} className="text-sm text-muted-foreground">
                        Recommend a{" "}
                        <span className="font-medium text-foreground">{g.name}</span>{" "}
                        {g.status === "not-eligible" ? "certification pathway" : "refresher module"}{" "}
                        before next redeployment.
                      </li>
                    ))
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
