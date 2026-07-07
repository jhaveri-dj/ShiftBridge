import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MessageThread, ThreadMessage } from "@/data/types";

export function MessageThreadView({
  thread,
  messages,
  highlightText,
}: {
  thread: MessageThread;
  messages?: ThreadMessage[];
  highlightText?: string;
}) {
  const items = messages ?? thread.messages;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold text-foreground">{thread.subject}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {thread.participants.join(" · ")}
        </p>
      </div>
      <div className="space-y-5 px-6 py-5">
        {items.map((m) => {
          const isHighlighted =
            !!highlightText &&
            m.body.toLowerCase().includes(highlightText.toLowerCase());
          return (
            <div key={m.id} className={cn("flex gap-3", m.isSystem && "items-start")}>
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  m.isSystem
                    ? "bg-primary/10 text-primary"
                    : "bg-accent text-accent-foreground",
                )}
              >
                {m.isSystem ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  m.author
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-foreground">{m.author}</span>
                  <span className="text-xs text-muted-foreground">{m.role}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{m.timestamp}</span>
                </div>
                <p
                  className={cn(
                    "mt-1 rounded-xl px-3 py-2 text-sm leading-relaxed",
                    isHighlighted
                      ? "bg-primary/10 text-foreground ring-1 ring-primary/40"
                      : m.isSystem
                        ? "bg-primary/5 text-foreground"
                        : "bg-muted/60 text-foreground",
                  )}
                >
                  {m.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
