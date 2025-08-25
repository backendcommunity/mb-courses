"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampDashboardPage } from "@/components/pages/bootcamp-dashboard";
import { useRouter } from "next/navigation";

interface BootcampDashboardPageRouteProps {
  params: {
    bootcampId: string;
  };
}

export default function BootcampDashboardPageRoute({
  params,
}: BootcampDashboardPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampDashboardPage
        bootcampId={params.bootcampId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
