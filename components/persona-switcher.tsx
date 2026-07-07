"use client";

import { useRouter } from "next/navigation";
import { Users2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useRole } from "@/lib/role-context";
import { ROLES, type RoleId } from "@/lib/roles";

export function PersonaSwitcher() {
  const { roleId, role, setRoleId } = useRole();
  const router = useRouter();

  function handleChange(next: string | null) {
    if (!next) return;
    const nextRole = next as RoleId;
    setRoleId(nextRole);
    router.push(ROLES[nextRole].homeHref);
  }

  return (
    <div className="border-t border-dashed border-sidebar-foreground/20 px-4 py-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-sidebar-foreground/40">
        <Users2 className="h-3 w-3" /> Portfolio demo tool
      </div>
      <Select value={roleId} onValueChange={handleChange}>
        <SelectTrigger
          size="sm"
          className="w-full justify-between border-dashed border-sidebar-foreground/25 bg-transparent text-[11px] font-normal text-sidebar-foreground/70 hover:bg-sidebar-accent/40 [&_svg]:text-sidebar-foreground/50"
        >
          <span className="truncate">
            Viewing as: {role.name} — Switch persona
          </span>
        </SelectTrigger>
        <SelectContent>
          {Object.values(ROLES).map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.name} ({r.title})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
