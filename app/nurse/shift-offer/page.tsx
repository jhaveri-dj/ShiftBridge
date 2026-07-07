"use client";

import { useState } from "react";
import { Check, X, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MatchScoreRing } from "@/components/match-score-card";
import { StatusBadge, statusLevelFromRisk } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { getNurseById } from "@/data/nurses";
import { getRequestByUnitId } from "@/data/requests";

type OfferState = "pending" | "accepted" | "declined";

export default function ShiftOfferPage() {
  const alex = getNurseById("alex-chen")!;
  const request = getRequestByUnitId("ortho-7w")!;
  const myMatch = request.matches.find((m) => m.nurseId === alex.id)!;
  const [state, setState] = useState<OfferState>("pending");

  return (
    <AppShell breadcrumbs={[{ label: "Shift Offers" }]}>
      <PageHeader
        title="Your shift offer"
        subtitle="Review the details below, then accept or decline."
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {request.unitName}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {request.shiftNeed} · Acuity: {request.acuity}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {request.patientPopulation}
            </p>
          </div>
          <MatchScoreRing score={myMatch.matchScore} size={84} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
          <StatusBadge
            label={`${myMatch.matchScore}% match`}
            level={myMatch.matchScore >= 85 ? "good" : "warning"}
          />
          <StatusBadge
            label={`Overtime risk: ${alex.overtimeRisk}`}
            level={statusLevelFromRisk(alex.overtimeRisk)}
          />
          <StatusBadge label="Float eligible" level="good" />
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Why you&rsquo;re a strong fit
          </h3>
          <ul className="space-y-2">
            {alex.matchReasons.map((reason, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          {state === "pending" && (
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setState("accepted")}>
                <Check className="h-4 w-4" /> Accept shift
              </Button>
              <Button variant="outline" onClick={() => setState("declined")}>
                <X className="h-4 w-4" /> Decline
              </Button>
            </div>
          )}

          {state === "accepted" && (
            <div className="flex items-center gap-3">
              <Button disabled className="opacity-100">
                <CheckCircle2 className="h-4 w-4" /> Accepted ✓
              </Button>
              <p className="text-sm text-good">
                You&rsquo;re confirmed for {request.unitName}, {request.shiftNeed}. Priya
                Nair has been notified.
              </p>
            </div>
          )}

          {state === "declined" && (
            <div className="flex items-center gap-3">
              <Button disabled variant="outline" className="opacity-100">
                <X className="h-4 w-4" /> Declined
              </Button>
              <p className="text-sm text-muted-foreground">
                You&rsquo;ve declined this offer. The staffing office has been notified
                and will route to the next match.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
