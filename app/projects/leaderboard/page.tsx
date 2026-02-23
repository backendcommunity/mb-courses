"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { GlobalLeaderboardPage } from "@/components/pages/projects-global-leaderboard";
import { useRouter } from "next/navigation";

export default function GlobalLeaderboardPageRoute() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <GlobalLeaderboardPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
