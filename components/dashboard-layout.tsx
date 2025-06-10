"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { NavigationBar } from "@/components/navigation-bar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPath: string
  onNavigate: (path: string) => void
}

export function DashboardLayout({ children, currentPath, onNavigate }: DashboardLayoutProps) {
  const { isMobile } = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [currentPath, isMobile])

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - conditionally shown based on sidebarOpen state */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out`}
      >
        <DashboardSidebar currentPath={currentPath} onNavigate={onNavigate} isMobile={isMobile} />
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-72">
        <NavigationBar onNavigate={onNavigate} onMenuToggle={toggleSidebar} isMobile={isMobile} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
