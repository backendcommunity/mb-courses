"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectsPage } from "@/components/pages/projects";
import { useRouter } from "next/navigation";

export default function ProjectsPageRoute() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <ProjectsPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
