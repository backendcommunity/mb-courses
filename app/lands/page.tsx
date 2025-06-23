"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { LandsPage } from "@/components/pages/lands"
import { useRouter } from "next/navigation"

export default function LandsPageRoute() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <LandsPage onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
