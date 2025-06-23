"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { LearningPathDetailPage } from "@/components/pages/learning-path-detail"
import { useRouter } from "next/navigation"

interface LearningPathDetailPageRouteProps {
  params: {
    pathId: string
  }
}

export default function LearningPathDetailPageRoute({ params }: LearningPathDetailPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <LearningPathDetailPage pathId={params.pathId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
