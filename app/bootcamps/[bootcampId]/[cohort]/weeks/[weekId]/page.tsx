"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampWeekPage } from "@/components/pages/bootcamp-week";
import { useParams, useRouter } from "next/navigation";

type BootcampWeekPageRouteProps = {
  bootcampId: string;
  weekId: string;
  cohort: string;
};

export default function BootcampWeekPageRoute() {
  const router = useRouter();
  const { bootcampId, weekId } = useParams() as BootcampWeekPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampWeekPage
        bootcampId={bootcampId}
        weekId={weekId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
