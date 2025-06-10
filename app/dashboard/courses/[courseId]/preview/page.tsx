"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CoursePreviewPage } from "@/components/pages/course-preview"
import { useRouter } from "next/navigation"

interface CoursePreviewPageRouteProps {
  params: {
    courseId: string
  }
}

export default function CoursePreviewPageRoute({ params }: CoursePreviewPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <CoursePreviewPage courseId={params.courseId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
