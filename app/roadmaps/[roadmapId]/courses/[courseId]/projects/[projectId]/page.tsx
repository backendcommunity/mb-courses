"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseProjectPage } from "@/components/pages/roadmap-course-project";
import { useRouter } from "next/navigation";

interface RoadmapCourseProjectPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
    projectId: string;
  };
}

export default function RoadmapCourseProjectPageRoute({
  params,
}: RoadmapCourseProjectPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseProjectPage
        roadmapId={params.roadmapId}
        courseId={params.courseId}
        milestoneId="m1"
        onBack={() => router.back()}
        onComplete={() => {}}
        projectId={params.projectId}
      />
    </DashboardLayout>
  );
}
