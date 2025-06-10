"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsPage } from "@/components/pages/settings"
import { useRouter } from "next/navigation"

export default function SettingsPageRoute() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <SettingsPage onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
