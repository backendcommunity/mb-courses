"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CourseDetailPage } from "@/components/pages/course-detail"
import { useRouter } from "next/navigation"

interface CourseDetailPageRouteProps {
  params: {
    courseId: string
  }
}

export default function CourseDetailPageRoute({ params }: CourseDetailPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <CourseDetailPage courseId={params.courseId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
