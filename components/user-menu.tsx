"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Home, Check, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/role-context";
import { ROLES, type RoleId } from "@/lib/roles";

/**
 * Shared account/demo menu used in every persona header. Combines the "real"
 * app actions (log out, back to landing) with the portfolio-only persona
 * switcher, clearly fenced off as demo controls so it never reads as a
 * production feature.
 */
export function UserMenu({ className }: { className?: string }) {
  const { roleId, role, setRoleId, clearRole } = useRole();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchPersona(id: RoleId) {
    setRoleId(id);
    setOpen(false);
    router.push(ROLES[id].homeHref);
  }

  function backToLanding() {
    setOpen(false);
    router.push("/");
  }

  function logout() {
    clearRole();
    setOpen(false);
    router.push("/");
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account and demo menu"
        className={cn(
          "flex items-center gap-1.5 rounded-full border border-transparent p-0.5 pr-1.5 transition-colors hover:bg-muted",
          open && "bg-muted",
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {role.initials}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">{role.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{role.title}</p>
          </div>

          <div className="p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={backToLanding}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Home className="h-4 w-4 text-muted-foreground" />
              Back to demo landing
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={logout}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              Log out
            </button>
          </div>

          <div className="border-t border-dashed border-border bg-muted/40 p-1.5">
            <p className="flex items-center gap-1.5 px-2.5 pb-1 pt-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              <Users2 className="h-3 w-3" /> Portfolio demo controls
            </p>
            <p className="px-2.5 pb-1.5 text-[11px] leading-snug text-muted-foreground/80">
              Switch persona to preview another role.
            </p>
            {Object.values(ROLES).map((r) => {
              const active = r.id === roleId;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => switchPersona(r.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{r.name}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {r.title}
                    </span>
                  </span>
                  {active && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
