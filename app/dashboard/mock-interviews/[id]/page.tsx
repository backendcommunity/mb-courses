"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { MockInterviewSessionPage } from "@/components/pages/mock-interview-session";
import { useRouter } from "next/navigation";

interface MockInterviewSessionPageRouteProps {
  params: {
    id: string;
  };
}

export default function MockInterviewSessionPageRoute({
  params,
}: MockInterviewSessionPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <MockInterviewSessionPage
        interviewId={params.id}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
