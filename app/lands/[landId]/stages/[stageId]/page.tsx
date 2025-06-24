"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { StageDetailPage } from "@/components/pages/stage-detail";
import { useRouter } from "next/navigation";

interface StageDetailPageRouteProps {
  params: {
    landId: string;
    stageId: string;
  };
}

export default function StageDetailPageRoute({
  params,
}: StageDetailPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <StageDetailPage
        landId={params.landId}
        stageId={params.stageId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
