import { Building2, CalendarClock, Users2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MessageThreadView } from "@/components/message-thread";
import { messageThreads } from "@/data/messages";
import { getRequestByUnitId } from "@/data/requests";

export default function NurseMessagesPage() {
  const thread = messageThreads[0];
  const request = getRequestByUnitId("ortho-7w")!;
  const relevantMessages = thread.messages.filter(
    (m) => m.isSystem || m.body.toLowerCase().includes("alex"),
  );

  return (
    <AppShell breadcrumbs={[{ label: "Messages" }]}>
      <PageHeader
        title="Messages"
        subtitle="Updates on your Orthopedics 7W shift offer from the staffing office and unit manager."
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        {/* LEFT — request context */}
        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">
              {thread.subject}
            </h2>
            <dl className="mt-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Unit</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {request.unitName}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Shift</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {request.shiftNeed}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Participants</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {thread.participants.join(" · ")}
                  </dd>
                </div>
              </div>
            </dl>
            <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Care context
              </p>
              <p className="mt-0.5 text-sm text-foreground">
                {request.patientPopulation}
              </p>
            </div>
          </div>
        </aside>

        {/* RIGHT — thread */}
        <MessageThreadView
          thread={thread}
          messages={relevantMessages}
          highlightText="Alex"
        />
      </div>
    </AppShell>
  );
}
