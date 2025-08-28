"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampDetailPage } from "@/components/pages/bootcamp-detail";
import { useParams, useRouter } from "next/navigation";

type BootcampDetailPageRouteProps = {
  bootcampId: string;
};

export default function BootcampDetailPageRoute() {
  const router = useRouter();
  const { bootcampId } = useParams() as BootcampDetailPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampDetailPage bootcampId={bootcampId} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
