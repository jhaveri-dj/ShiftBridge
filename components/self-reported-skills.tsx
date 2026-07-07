"use client";

import { useState } from "react";
import { Paperclip, Plus, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

interface SelfReportedSkill {
  id: string;
  name: string;
  source: string;
  fileName?: string;
}

export function SelfReportedSkills() {
  const [skills, setSkills] = useState<SelfReportedSkill[]>([]);
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  function addSkill() {
    if (!name.trim() || !source.trim()) return;
    setSkills((prev) => [
      ...prev,
      { id: `${Date.now()}`, name: name.trim(), source: source.trim(), fileName },
    ]);
    setName("");
    setSource("");
    setFileName(undefined);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold text-foreground">
        Add a skill or certification
      </h2>
      <p className="mb-4 text-xs text-muted-foreground">
        Self-reported skills show as &ldquo;Pending verification&rdquo; until your
        professional practice lead confirms them.
      </p>

      <div className="space-y-2.5">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Skill or certification name (e.g. ACLS Certification)"
        />
        <Input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Where / when obtained (e.g. Red Cross, March 2026)"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setFileName(fileName ? undefined : "certificate.pdf")}
        >
          <Paperclip className="h-3.5 w-3.5" />
          {fileName ? `Attached: ${fileName}` : "Attach certificate (optional)"}
        </Button>
        <Button
          className="w-full"
          onClick={addSkill}
          disabled={!name.trim() || !source.trim()}
        >
          <Plus className="h-3.5 w-3.5" /> Add skill
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="mt-4 space-y-2.5 border-t border-border pt-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="rounded-lg border border-warning/30 bg-warning-bg/40 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{skill.name}</p>
                <StatusBadge label="Pending verification" level="warning" />
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {skill.source}
                {skill.fileName && ` · ${skill.fileName} attached`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
