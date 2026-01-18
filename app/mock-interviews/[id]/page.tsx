"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { MockInterviewSessionPage } from "@/components/pages/mock-interview-session";
import { useParams, useRouter } from "next/navigation";

type MockInterviewSessionPageRouteProps = {
  id: string;
};

export default function MockInterviewSessionPageRoute({}) {
  const router = useRouter();
  const { id } = useParams() as MockInterviewSessionPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <MockInterviewSessionPage sessionId={id} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
