"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampWeekPage } from "@/components/pages/bootcamp-week";
import { useRouter } from "next/navigation";

interface BootcampWeekPageRouteProps {
  params: {
    bootcampId: string;
    weekId: string;
  };
}

export default function BootcampWeekPageRoute({
  params,
}: BootcampWeekPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampWeekPage
        bootcampId={params.bootcampId}
        weekId={params.weekId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
