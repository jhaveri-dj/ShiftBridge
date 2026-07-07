"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadReportButton({ reportName }: { reportName: string }) {
  const [downloaded, setDownloaded] = useState(false);

  function handleClick() {
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2500);
  }

  return (
    <Button size="sm" variant="outline" onClick={handleClick} aria-label={`Download ${reportName} PDF`}>
      {downloaded ? (
        <>
          <Check className="h-3.5 w-3.5" /> Downloaded ✓
        </>
      ) : (
        <>
          <Download className="h-3.5 w-3.5" /> Download PDF
        </>
      )}
    </Button>
  );
}
