"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { RoadmapDetailPage } from "@/components/pages/roadmap-detail"
import { useRouter } from "next/navigation"

interface RoadmapDetailPageRouteProps {
  params: {
    roadmapId: string
  }
}

export default function RoadmapDetailPageRoute({ params }: RoadmapDetailPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <RoadmapDetailPage roadmapId={params.roadmapId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
