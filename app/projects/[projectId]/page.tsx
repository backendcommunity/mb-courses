"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProjectDetailPage } from "@/components/pages/project-detail"
import { useRouter } from "next/navigation"

interface ProjectDetailPageRouteProps {
  params: {
    projectId: string
  }
}

export default function ProjectDetailPageRoute({ params }: ProjectDetailPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <ProjectDetailPage projectId={params.projectId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
