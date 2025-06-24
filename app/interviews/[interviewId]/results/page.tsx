"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { InterviewResultsPage } from "@/components/pages/interview-results";
import { useRouter } from "next/navigation";

interface InterviewResultsPageRouteProps {
  params: {
    interviewId: string;
  };
}

export default function InterviewResultsPageRoute({
  params,
}: InterviewResultsPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <InterviewResultsPage
        interviewId={params.interviewId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
