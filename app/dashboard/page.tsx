"use client"

import dynamic from "next/dynamic"

// Dynamically import the Dashboard component with no SSR
const Dashboard = dynamic(() => import("../../dashboard"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function DashboardPage() {
  return <Dashboard />
}
