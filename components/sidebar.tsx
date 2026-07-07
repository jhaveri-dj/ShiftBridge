"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/role-context";
import { NAV_BY_ROLE } from "@/lib/nav";
import { PersonaSwitcher } from "@/components/persona-switcher";

export function Sidebar() {
  const pathname = usePathname();
  const { role, roleId } = useRole();
  const items = NAV_BY_ROLE[roleId];

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-l border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="px-4 py-5">
        <span className="text-base font-semibold tracking-tight">CareMatch</span>
        <p className="mt-1 text-xs text-sidebar-foreground/70">{role.name}</p>
        <p className="text-[11px] text-sidebar-foreground/50">{role.title}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <p className="text-[11px] leading-relaxed text-sidebar-foreground/70">
          Synthetic data only. Portfolio prototype — not a deployed clinical
          system.
        </p>
      </div>

      <PersonaSwitcher />
    </aside>
  );
}
