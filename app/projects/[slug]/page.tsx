"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectDetailPage } from "@/components/pages/project-detail";
import { useParams, useRouter } from "next/navigation";

type ProjectDetailPageRouteProps = {
  slug: string;
};

export default function ProjectDetailPageRoute() {
  const router = useRouter();
  const { slug } = useParams() as ProjectDetailPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <ProjectDetailPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
