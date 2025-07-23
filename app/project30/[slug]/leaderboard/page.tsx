"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30LeaderboardPage } from "@/components/pages/project30-leaderboard";
import { useParams, useRouter } from "next/navigation";

type Project30LeaderboardPageRouteProps = {
  slug: string;
};

export default function Project30LeaderboardPageRoute() {
  const router = useRouter();
  const { slug } = useParams() as Project30LeaderboardPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30LeaderboardPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
