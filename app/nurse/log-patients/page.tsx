"use client";

import { useState } from "react";
import { NotebookPen, Trash2, Info } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LogEntry {
  id: string;
  identifier: string;
  note: string;
  timestamp: string;
}

export default function LogPatientsPage() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [identifier, setIdentifier] = useState("");
  const [note, setNote] = useState("");

  function addEntry() {
    if (!identifier.trim() || !note.trim()) return;
    setEntries((prev) => [
      {
        id: `${Date.now()}`,
        identifier: identifier.trim(),
        note: note.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
      ...prev,
    ]);
    setIdentifier("");
    setNote("");
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <AppShell breadcrumbs={[{ label: "Handoff Notes" }]}>
      <PageHeader
        title="Handoff notes"
        subtitle="Quick end-of-shift handoff notes for your current shift."
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* LEFT — guidance + entry form */}
        <div className="space-y-5">
          <div className="flex gap-2 rounded-lg bg-muted/60 px-3 py-2.5 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <p>
              Synthetic demo feature. This log is for lightweight handoff / staffing-relevant
              notes only — it is not clinical documentation and does not replace charting in
              the EHR. Use generic identifiers only, no real patient information.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <NotebookPen className="h-4 w-4 text-primary" /> Add an entry
            </h2>
            <div className="space-y-2.5">
              <Input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Location or handoff label (e.g. Room 412)"
              />
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Brief note (e.g. ambulated in hallway, tolerated well)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addEntry();
                }}
              />
              <Button
                className="w-full"
                onClick={addEntry}
                disabled={!identifier.trim() || !note.trim()}
              >
                Add entry
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT — entries */}
        <div>
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Tonight&rsquo;s entries ({entries.length})
          </h2>
          {entries.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
              No entries logged yet. Add your first note using the form.
            </p>
          ) : (
            <div className="space-y-2.5">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {entry.identifier}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-critical"
                    aria-label="Remove entry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
