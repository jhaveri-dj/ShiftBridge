"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ROLES, type RoleId, type RoleMeta } from "@/lib/roles";

const STORAGE_KEY = "shiftbridge:role";

interface RoleContextValue {
  roleId: RoleId;
  role: RoleMeta;
  setRoleId: (id: RoleId) => void;
  clearRole: () => void;
  /** false until localStorage has been read, to avoid a hydration flash. */
  ready: boolean;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [roleId, setRoleIdState] = useState<RoleId>("sarah");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "sarah" || stored === "priya" || stored === "alex") {
      // One-time hydration from localStorage after mount — window is
      // unavailable during SSR, so this can't be a lazy useState initializer.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoleIdState(stored);
    }
    setReady(true);
  }, []);

  function setRoleId(id: RoleId) {
    setRoleIdState(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  }

  function clearRole() {
    setRoleIdState("sarah");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <RoleContext.Provider
      value={{ roleId, role: ROLES[roleId], setRoleId, clearRole, ready }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within a RoleProvider");
  return ctx;
}
