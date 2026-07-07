"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MessageThreadView } from "@/components/message-thread";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRole } from "@/lib/role-context";
import { messageThreads } from "@/data/messages";
import { getNurseById } from "@/data/nurses";
import type { ThreadMessage } from "@/data/types";

export function MessagesPageClient() {
  const searchParams = useSearchParams();
  const { role } = useRole();
  const thread = messageThreads[0];
  const nurseId = searchParams.get("nurse");
  const nurse = nurseId ? getNurseById(nurseId) : undefined;

  const [messages, setMessages] = useState<ThreadMessage[]>(thread.messages);
  const [draft, setDraft] = useState("");

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${prev.length}`,
        author: role.name,
        role: role.title,
        timestamp: "Just now",
        body: text,
      },
    ]);
    setDraft("");
  }

  return (
    <AppShell breadcrumbs={[{ label: "Messages" }]}>
      <PageHeader
        title="Messages"
        subtitle="Staffing-request threads between the staffing office, unit managers, and CareMatch AI."
      />

      {nurse && (
        <div className="mb-4 rounded-lg bg-primary/5 px-3 py-2 text-sm text-foreground">
          Showing the thread relevant to <strong>{nurse.name}</strong>&rsquo;s current
          request — highlighted below.
        </div>
      )}

      <MessageThreadView thread={thread} messages={messages} highlightText={nurse?.name} />

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Reply to this thread…"
          className="border-0 shadow-none focus-visible:ring-0"
        />
        <Button size="sm" onClick={handleSend} disabled={!draft.trim()}>
          Send <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </AppShell>
  );
}
