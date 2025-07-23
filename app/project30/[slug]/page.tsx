"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30Page } from "@/components/pages/project30";
import { useParams, useRouter } from "next/navigation";

type Project30PageRouteProps = {
  slug: string;
};

export default function Project30PageRoute({}: Project30PageRouteProps) {
  const { slug } = useParams() as Project30PageRouteProps;
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30Page slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
