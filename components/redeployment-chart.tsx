"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import type { Nurse } from "@/data/types";

const OUTCOME_COLOR: Record<string, string> = {
  Successful: "var(--good)",
  Partial: "var(--warning)",
  Cancelled: "var(--critical)",
};

export function RedeploymentChart({
  history,
}: {
  history: Nurse["redeploymentHistory"];
}) {
  const data = [...history].reverse().map((h) => ({
    name: h.unit,
    date: h.date,
    rating: h.rating,
    outcome: h.outcome,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={50}
          />
          <YAxis
            domain={[0, 5]}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value, _name, entry) => [
              `${value} / 5 — ${entry.payload.outcome}`,
              entry.payload.date,
            ]}
          />
          <Bar dataKey="rating" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((d, i) => (
              <Cell key={i} fill={OUTCOME_COLOR[d.outcome]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
