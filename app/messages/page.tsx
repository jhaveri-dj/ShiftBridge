import { Suspense } from "react";
import { MessagesPageClient } from "@/components/messages-page-client";

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesPageClient />
    </Suspense>
  );
}
