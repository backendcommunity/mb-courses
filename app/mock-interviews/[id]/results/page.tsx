"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { MockInterviewResultsPage } from "@/components/pages/mock-interview-results";
import { useRouter } from "next/navigation";

interface MockInterviewResultsPageRouteProps {
  params: {
    id: string;
  };
}

export default function MockInterviewResultsPageRoute({
  params,
}: MockInterviewResultsPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <MockInterviewResultsPage
        sessionId={params.id}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
