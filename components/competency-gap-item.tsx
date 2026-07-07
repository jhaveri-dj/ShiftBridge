"use client";

import { useState } from "react";
import { AlertTriangle, XCircle, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompetencyBar } from "@/components/competency-bar";
import { Button } from "@/components/ui/button";
import { getGapInfo, gapFramingText } from "@/lib/eligibility";
import type { Competency } from "@/data/types";

export function CompetencyGapItem({
  competency,
  required,
  recency,
}: {
  competency: Competency;
  required: boolean;
  recency?: string | null;
}) {
  const [resolved, setResolved] = useState(false);

  if (competency.status === "current") {
    return (
      <CompetencyBar
        name={competency.name}
        status={competency.status}
        level={competency.level}
        required={required}
        recency={recency}
      />
    );
  }

  const blocked = competency.status === "not-eligible";
  const gap = getGapInfo(competency.name, blocked);
  const framing = gapFramingText(competency, required);

  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        blocked ? "border-critical/30 bg-critical-bg/40" : "border-warning/30 bg-warning-bg/40",
      )}
    >
      <div className="flex items-start gap-2">
        {blocked ? (
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-critical" />
        ) : (
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{competency.name}</p>
          <p className={cn("text-xs", blocked ? "text-critical" : "text-warning")}>
            {framing}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" /> {gap.effort}
      </div>

      <Button
        size="sm"
        variant={resolved ? "outline" : blocked ? "default" : "outline"}
        disabled={resolved}
        className="mt-3 w-full"
        onClick={() => setResolved(true)}
      >
        {resolved ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" />
            {gap.ctaType === "signoff" ? "Sign-off requested ✓" : "Training started ✓"}
          </>
        ) : (
          gap.ctaLabel
        )}
      </Button>
    </div>
  );
}
