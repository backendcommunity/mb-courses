"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectLeaderboardPage } from "@/components/pages/project-leaderboard";
import { useParams, useRouter } from "next/navigation";

type ProjectLeaderboardPageRouteProps = {
  slug: string;
};

export default function ProjectLeaderboardPageRoute() {
  const router = useRouter();
  const { slug } = useParams() as ProjectLeaderboardPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <ProjectLeaderboardPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
