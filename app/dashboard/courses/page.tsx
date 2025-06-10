"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CoursesPage } from "@/components/pages/courses"
import { useRouter } from "next/navigation"

export default function CoursesPageRoute() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <CoursesPage onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
