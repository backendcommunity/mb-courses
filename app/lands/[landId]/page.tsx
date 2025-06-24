"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { LandDetailPage } from "@/components/pages/land-detail"
import { useRouter } from "next/navigation"

interface LandDetailPageRouteProps {
  params: {
    landId: string
  }
}

export default function LandDetailPageRoute({ params }: LandDetailPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <LandDetailPage landId={params.landId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
