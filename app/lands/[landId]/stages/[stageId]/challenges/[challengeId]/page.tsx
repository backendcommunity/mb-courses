"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ChallengeDetailPage } from "@/components/pages/challenge-detail";
import { useRouter } from "next/navigation";

interface ChallengeDetailPageRouteProps {
  params: {
    landId: string;
    stageId: string;
    challengeId: string;
  };
}

export default function ChallengeDetailPageRoute({
  params,
}: ChallengeDetailPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <ChallengeDetailPage
        landId={params.landId}
        stageId={params.stageId}
        challengeId={params.challengeId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
