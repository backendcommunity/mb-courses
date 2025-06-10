"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CourseWatchPage } from "@/components/pages/course-watch"
import { useRouter } from "next/navigation"

interface CourseWatchPageRouteProps {
  params: {
    courseId: string
    chapterId: string
  }
}

export default function CourseWatchPageRoute({ params }: CourseWatchPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <CourseWatchPage courseId={params.courseId} chapterId={params.chapterId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
