"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { LearningPathContinuePage } from "@/components/pages/learning-path-continue";
import { useRouter } from "next/navigation";

interface LearningPathContinuePageRouteProps {
  params: {
    pathId: string;
  };
}

export default function LearningPathContinuePageRoute({
  params,
}: LearningPathContinuePageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <LearningPathContinuePage
        pathId={params.pathId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
