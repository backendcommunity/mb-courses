"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { LeaderboardPage } from "@/components/pages/leaderboard";
import { useParams, useRouter } from "next/navigation";

type LeaderboardPageRouteProps = {
  slug: string;
};

export default function LeaderboardPageRoute() {
  const router = useRouter();
  const { slug } = useParams() as LeaderboardPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <LeaderboardPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
