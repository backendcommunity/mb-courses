"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30CommunityPage } from "@/components/pages/project30-community";
import { useRouter } from "next/navigation";

interface Project30CommunityPageRouteProps {
  params: {
    courseId: string;
    dayNumber: string;
  };
}

export default function Project30CommunityPageRoute({
  params,
}: Project30CommunityPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30CommunityPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
