"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectTaskDetail } from "@/components/pages/project-task-detail";
import { useParams, useRouter } from "next/navigation";

type ProjectTaskDetailRouteProps = {
  slug: string;
};

export default function ProjectTaskDetailRoute() {
  const router = useRouter();
  const { slug } = useParams() as ProjectTaskDetailRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <ProjectTaskDetail slug={slug} id="q" onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
