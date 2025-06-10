"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BootcampDetailPage } from "@/components/pages/bootcamp-detail"
import { useRouter } from "next/navigation"

interface BootcampDetailPageRouteProps {
  params: {
    bootcampId: string
  }
}

export default function BootcampDetailPageRoute({ params }: BootcampDetailPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <BootcampDetailPage bootcampId={params.bootcampId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
