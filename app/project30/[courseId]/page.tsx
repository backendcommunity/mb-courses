"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Project30Page } from "@/components/pages/project30"
import { useRouter } from "next/navigation"

interface Project30PageRouteProps {
  params: {
    courseId: string
  }
}

export default function Project30PageRoute({ params }: Project30PageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <Project30Page courseId={params.courseId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
