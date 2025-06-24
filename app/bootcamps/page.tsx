"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BootcampsPage } from "@/components/pages/bootcamps"
import { useRouter } from "next/navigation"

export default function BootcampsPageRoute() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <BootcampsPage onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
