"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfilePage } from "@/components/pages/profile"
import { useRouter } from "next/navigation"

export default function ProfilePageRoute() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <ProfilePage onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
