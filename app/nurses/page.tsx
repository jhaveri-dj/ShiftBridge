import { AppShell, PageHeader } from "@/components/app-shell";
import { NurseCard } from "@/components/nurse-card";
import { nurses } from "@/data/nurses";

export default function NursesIndexPage() {
  return (
    <AppShell breadcrumbs={[{ label: "Nurse Matches" }]}>
      <PageHeader
        title="Nurse Matches"
        subtitle="Available and redeployable nurses ranked by match score across open requests."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {nurses.map((nurse) => (
          <NurseCard key={nurse.id} nurse={nurse} />
        ))}
      </div>
    </AppShell>
  );
}
