"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { KapAIAssistant } from "@/components/kap-ai-assistant"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Extract the current page from the router's pathname
    const path = router.pathname.replace("/dashboard/", "")
    setCurrentPage(path)
  }, [router.pathname])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (you can customize this) */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <a
              href="/dashboard/overview"
              onClick={() => setCurrentPage("overview")}
              className={`block p-2 rounded hover:bg-gray-300 ${currentPage === "overview" ? "bg-gray-300" : ""}`}
            >
              Overview
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/dashboard/settings"
              onClick={() => setCurrentPage("settings")}
              className={`block p-2 rounded hover:bg-gray-300 ${currentPage === "settings" ? "bg-gray-300" : ""}`}
            >
              Settings
            </a>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-semibold mb-4">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
        <div className="bg-white rounded shadow p-4">{children}</div>
      </div>
      <KapAIAssistant onNavigate={(path) => setCurrentPage(path.replace("/dashboard/", ""))} />
    </div>
  )
}

export default DashboardLayout
