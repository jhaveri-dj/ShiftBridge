"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  MessageSquare,
  GraduationCap,
  History,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Nurse } from "@/data/types";

export function NurseActions({ nurse }: { nurse: Nurse }) {
  const router = useRouter();
  const [requestSent, setRequestSent] = useState(false);
  const [refresherAssigned, setRefresherAssigned] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const gapCompetency = nurse.competencies.find((c) => c.status !== "current");

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Actions</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button size="sm" disabled={requestSent} onClick={() => setRequestSent(true)}>
          {requestSent ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" /> Request sent ✓
            </>
          ) : (
            <>
              <UserPlus className="h-3.5 w-3.5" /> Request nurse
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/messages?nurse=${nurse.id}`)}
        >
          <MessageSquare className="h-3.5 w-3.5" /> Message staffing office
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={refresherAssigned || !gapCompetency}
          onClick={() => setRefresherAssigned(true)}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          {refresherAssigned ? "Refresher assigned ✓" : "Assign refresher"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setHistoryExpanded((v) => !v)}
        >
          <History className="h-3.5 w-3.5" /> View full history
          {historyExpanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {requestSent && (
        <p className="mt-3 rounded-lg bg-good-bg px-3 py-2 text-xs text-good">
          Request sent to {nurse.name}. They&rsquo;ll be notified and can accept or
          decline from their shift offers.
        </p>
      )}

      {refresherAssigned && gapCompetency && (
        <p className="mt-3 rounded-lg bg-warning-bg px-3 py-2 text-xs text-warning">
          Refresher assigned for {gapCompetency.name}.
        </p>
      )}

      {historyExpanded && (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Full redeployment history
          </p>
          {nurse.redeploymentHistory.map((h, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_6rem_7rem] items-center gap-3 rounded-lg bg-muted/60 px-3 py-2 text-xs"
            >
              <span className="truncate text-foreground">{h.unit}</span>
              <span className="text-muted-foreground">{h.date}</span>
              <span className="whitespace-nowrap text-right text-muted-foreground">
                {h.outcome} · {h.rating}/5
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
