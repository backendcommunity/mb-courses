"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30LeaderboardPage } from "@/components/pages/project30-leaderboard";
import { useRouter } from "next/navigation";

interface Project30LeaderboardPageRouteProps {
  params: {
    courseId: string;
    dayNumber: string;
  };
}

export default function Project30LeaderboardPageRoute({
  params,
}: Project30LeaderboardPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30LeaderboardPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
