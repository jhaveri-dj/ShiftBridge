import { notFound } from "next/navigation";
import { RequestDetailView } from "@/components/request-detail-view";
import { getRequestByUnitId } from "@/data/requests";
import { getUnitById } from "@/data/units";

export function generateStaticParams() {
  return [{ id: "ortho-7w" }, { id: "medicine-4e" }];
}

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = getRequestByUnitId(id);
  const unit = getUnitById(id);

  if (!request || !unit) notFound();

  return <RequestDetailView request={request} unit={unit} />;
}
