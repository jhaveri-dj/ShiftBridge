import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BookOpenCheck,
  MessageSquare,
  FileBarChart,
  Home,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import type { RoleId } from "@/lib/roles";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_BY_ROLE: Record<RoleId, NavItem[]> = {
  sarah: [
    { label: "Command Center", href: "/command-center", icon: LayoutDashboard },
    { label: "Staffing Requests", href: "/requests", icon: ClipboardList },
    { label: "Nurse Matches", href: "/nurses", icon: Users },
    { label: "Skills Repository", href: "/skills", icon: BookOpenCheck },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Reports", href: "/reports", icon: FileBarChart },
  ],
  priya: [
    { label: "My Unit", href: "/requests/ortho-7w", icon: ClipboardList },
    { label: "Nurse Matches", href: "/nurses", icon: Users },
    { label: "Skills Repository", href: "/skills", icon: BookOpenCheck },
    { label: "Messages", href: "/messages", icon: MessageSquare },
  ],
  alex: [
    { label: "Home", href: "/nurse/home", icon: Home },
    { label: "Shift Offers", href: "/nurse/shift-offer", icon: CalendarCheck },
    { label: "My Competencies", href: "/nurse/competencies", icon: BookOpenCheck },
    { label: "Messages", href: "/messages", icon: MessageSquare },
  ],
};
