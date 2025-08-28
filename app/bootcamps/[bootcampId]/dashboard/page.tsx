"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampDashboardPage } from "@/components/pages/bootcamp-dashboard";
import { useParams, useRouter } from "next/navigation";

type BootcampDashboardPageRouteProps = {
  bootcampId: string;
};

export default function BootcampDashboardPageRoute() {
  const router = useRouter();
  const { bootcampId } = useParams() as BootcampDashboardPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampDashboardPage
        bootcampId={bootcampId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
