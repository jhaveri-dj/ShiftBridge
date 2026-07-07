import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MatchScorePill } from "@/components/match-score-card";
import type { MatchRow } from "@/data/types";

const APPROVAL_STYLE: Record<MatchRow["approvalStatus"], string> = {
  Pending: "text-muted-foreground",
  Approved: "text-good font-medium",
  Declined: "text-critical font-medium",
  "Awaiting sending unit": "text-warning font-medium",
};

export function MatchTable({ matches }: { matches: MatchRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nurse</TableHead>
          <TableHead>Home unit</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Match score</TableHead>
          <TableHead>Key competencies</TableHead>
          <TableHead>Risk flags</TableHead>
          <TableHead>Approval status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((m) => (
          <TableRow key={m.nurseId}>
            <TableCell className="font-medium text-foreground">
              {m.nurseName}
            </TableCell>
            <TableCell className="text-muted-foreground">{m.homeUnit}</TableCell>
            <TableCell className="text-muted-foreground">{m.availability}</TableCell>
            <TableCell>
              <MatchScorePill score={m.matchScore} />
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {m.keyCompetencies.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {m.riskFlags.length === 0 ? (
                <span className="text-xs text-muted-foreground">None</span>
              ) : (
                <div className="space-y-1">
                  {m.riskFlags.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-1 text-xs text-warning"
                    >
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </TableCell>
            <TableCell className={APPROVAL_STYLE[m.approvalStatus]}>
              {m.approvalStatus}
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
                render={<Link href={`/nurses/${m.nurseId}`} />}
                nativeButton={false}
              >
                View profile
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
