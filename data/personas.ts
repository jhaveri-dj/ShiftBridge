import type { RoleId } from "@/lib/roles";

export interface Persona {
  id: RoleId;
  name: string;
  role: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export const personas: Persona[] = [
  {
    id: "sarah",
    name: "Sarah Mitchell",
    role: "Staffing Office Lead",
    description:
      "See hospital-wide gaps, unit risk, AI triage, and coverage recommendations.",
    href: "/command-center",
    ctaLabel: "Open Command Center",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Unit Manager, Orthopedics 7W",
    description:
      "Review unit outlook, required competencies, and recommended nurse matches.",
    href: "/requests/ortho-7w",
    ctaLabel: "Review Unit Request",
  },
  {
    id: "alex",
    name: "Alex Chen",
    role: "Float Pool RN",
    description:
      "Review a shift offer, match reasons, pay estimate, and safety guardrails.",
    href: "/nurse/shift-offer",
    ctaLabel: "View Shift Offer",
  },
];
