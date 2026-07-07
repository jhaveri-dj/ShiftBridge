"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Lightweight client-only store for unit manager reports. Priya submits a
 * report from her Unit Report page and it is persisted to localStorage, so
 * Sarah's Unit Metrics dashboard can reflect it without any backend or any
 * change to shared architecture. This mirrors replacing a recurring 30 to 40
 * minute verbal bed-huddle call with a 2 minute structured update.
 */

export interface UnitReport {
  unitId: string;
  census: number;
  expectedDischarges: number;
  expectedAdmissions: number;
  note: string;
  /** Epoch milliseconds when the report was submitted. */
  updatedAt: number;
  /** Who submitted, for display on the dashboard. */
  reportedBy: string;
}

export type UnitReports = Record<string, UnitReport>;

const STORAGE_KEY = "shiftbridge:unit-reports";

export function loadUnitReports(): UnitReports {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UnitReports) : {};
  } catch {
    /* ignore malformed or unavailable storage */
    return {};
  }
}

export function useUnitReports() {
  const [reports, setReports] = useState<UnitReports>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount, mirroring the pattern
    // used in role-context. window is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReports(loadUnitReports());
    setReady(true);

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setReports(loadUnitReports());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const saveReport = useCallback((report: UnitReport) => {
    setReports((prev) => {
      const next = { ...prev, [report.unitId]: report };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore unavailable storage */
      }
      return next;
    });
  }, []);

  return { reports, ready, saveReport };
}

export function formatUpdatedAgo(ts: number): string {
  const mins = Math.max(0, Math.round((Date.now() - ts) / 60000));
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  return hrs === 1 ? "1 hr ago" : `${hrs} hr ago`;
}
