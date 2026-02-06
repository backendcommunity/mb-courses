"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectSubmissionsPage } from "@/components/pages/project-submissions";
import { useRouter } from "next/navigation";

export default function SubmissionsPageRoute() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <ProjectSubmissionsPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
