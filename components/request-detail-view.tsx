"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Gauge,
  Users,
  Timer,
  TrendingUp,
  Building2,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { StatusBadge, statusLevelFromFillRisk } from "@/components/status-badge";
import { LifecycleTimeline } from "@/components/lifecycle-timeline";
import { MatchTable } from "@/components/match-table";
import { NurseEligibilityList } from "@/components/nurse-eligibility-list";
import { CoverageTimeline } from "@/components/coverage-timeline";
import { useRole } from "@/lib/role-context";
import { PRIYA_HOME_UNIT_ID } from "@/lib/roles";
import { lifecycleSteps, requests as allRequests } from "@/data/requests";
import { rankingFactors } from "@/data/matches";
import type { StaffingRequest, Unit } from "@/data/types";

export function RequestDetailView({
  request,
  unit,
}: {
  request: StaffingRequest;
  unit: Unit;
}) {
  const { roleId } = useRole();
  const isPriyaOwnUnit = roleId === "priya" && request.unitId === PRIYA_HOME_UNIT_ID;
  const otherOpenRequests = allRequests.filter((r) => r.id !== request.id);
  const rankedMatches = [...request.matches].sort((a, b) => b.matchScore - a.matchScore);
  const topMatch = rankedMatches[0];

  const breadcrumbs = isPriyaOwnUnit
    ? [{ label: "My Unit", href: "/requests/ortho-7w" }, { label: "Active Request" }]
    : [
        { label: "Staffing Requests", href: "/requests" },
        { label: request.unitName },
      ];

  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {isPriyaOwnUnit ? "Your open request" : request.unitName}
              </h1>
              <StatusBadge
                label={unit.statusLabel}
                level={statusLevelFromFillRisk(request.gapSeverity)}
              />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {isPriyaOwnUnit ? (
                <>
                  {request.unitName} · {request.shiftNeed} · Acuity: {request.acuity}
                </>
              ) : (
                <>
                  {request.shiftNeed} · Acuity: {request.acuity} · Owner:{" "}
                  {request.requestOwner}
                </>
              )}
            </p>
          </div>
          <div className="rounded-lg bg-muted px-3 py-2 text-right text-xs text-muted-foreground">
            Status
            <p className="text-sm font-semibold text-foreground">{request.status}</p>
          </div>
        </div>

        {isPriyaOwnUnit ? (
          <p className="mt-4 rounded-lg bg-primary/5 px-3 py-2 text-sm text-foreground">
            This is your unit&rsquo;s active staffing request. Review the
            recommended matches below and approve based on fit for your team.
          </p>
        ) : (
          <p className="mt-4 rounded-lg bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
            This is 1 of {allRequests.length} open requests hospital-wide.{" "}
            <Link href="/requests" className="font-medium text-primary hover:underline">
              View all staffing requests
            </Link>
            .
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm sm:grid-cols-4">
          <InfoItem label="Unit" value={request.unitName} />
          <InfoItem label="Shift" value={request.shiftNeed} />
          <InfoItem label="Care context" value={request.patientPopulation} />
          <InfoItem label="Request created" value={request.createdAt} />
        </div>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            Recommend approving {topMatch.nurseName} — {topMatch.matchScore}% match,{" "}
            {topMatch.riskFlags.length === 0
              ? "no risk flags"
              : "lowest risk among candidates"}
            .
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on availability, unit experience, competency fit, training status,
            home-unit pressure, and overtime risk.
          </p>
          <Button
            size="sm"
            className="mt-3"
            render={<Link href={`/nurses/${topMatch.nurseId}`} />}
            nativeButton={false}
          >
            Review {topMatch.nurseName}&rsquo;s profile
          </Button>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-6 text-sm font-semibold text-foreground">Request lifecycle</h2>
        <LifecycleTimeline steps={lifecycleSteps} currentStep={request.currentStep} />
      </div>

      {isPriyaOwnUnit && (
        <div className="mb-6">
          <CoverageTimeline />
        </div>
      )}

      <div className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Supporting detail
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          <MetricCard
            label="Gap severity"
            value={
              request.gapSeverity.charAt(0).toUpperCase() + request.gapSeverity.slice(1)
            }
            icon={AlertTriangle}
            level={statusLevelFromFillRisk(request.gapSeverity)}
          />
          <MetricCard label="Match confidence" value={`${request.matchConfidence}%`} icon={Gauge} level="good" />
          <MetricCard label="Qualified matches" value={String(request.qualifiedMatchCount)} icon={Users} />
          <MetricCard label="Est. time to fill" value={request.estTimeToFill} icon={Timer} />
          <MetricCard
            label="Overtime risk"
            value={request.overtimeRisk}
            icon={TrendingUp}
            level={statusLevelFromFillRisk(
              request.overtimeRisk === "Low" ? "low" : request.overtimeRisk === "Medium" ? "medium" : "high",
            )}
          />
          <MetricCard
            label="Home-unit pressure"
            value={request.homeUnitPressure}
            icon={Building2}
            level={statusLevelFromFillRisk(
              request.homeUnitPressure === "Low" ? "low" : request.homeUnitPressure === "Medium" ? "medium" : "high",
            )}
          />
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Required competencies</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {request.requiredCompetencies.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
            >
              {c.required ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <span className="text-foreground">{c.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {c.required ? "Required" : "Preferred"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold text-foreground">
          {isPriyaOwnUnit ? "Recommended matches for your unit" : "Recommended matches"}
        </h2>
        <p className="mb-4 text-xs text-muted-foreground">
          ShiftBridge ranks matches using {rankingFactors.join(", ").toLowerCase()}.
        </p>
        {isPriyaOwnUnit ? (
          <NurseEligibilityList matches={rankedMatches} />
        ) : (
          <div className="overflow-x-auto">
            <MatchTable matches={rankedMatches} />
          </div>
        )}
      </div>

      {!isPriyaOwnUnit && otherOpenRequests.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Other open requests hospital-wide
          </h2>
          <div className="space-y-2">
            {otherOpenRequests.map((r) => (
              <Link
                key={r.id}
                href={`/requests/${r.unitId}`}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted/60"
              >
                <span className="text-foreground">
                  {r.unitName} <span className="text-muted-foreground">· {r.shiftNeed}</span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium text-foreground">{value}</p>
    </div>
  );
}
