"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NavigationBar } from "@/components/navigation-bar"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPath: string
  onNavigate: (path: string) => void
}

export function DashboardLayout({ children, currentPath, onNavigate }: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Detect mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close sidebar when navigating on mobile
  const handleNavigate = (path: string) => {
    onNavigate(path)
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px] max-w-[80vw]">
            <DashboardSidebar currentPath={currentPath} onNavigate={handleNavigate} isMobile={true} />
          </SheetContent>
        </Sheet>
      )}

      {/* Navigation Bar */}
      <NavigationBar onNavigate={onNavigate} onMenuToggle={() => setIsSidebarOpen(true)} isMobile={isMobile} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Only shown on desktop */}
        {!isMobile && (
          <div className="hidden md:block w-64 flex-shrink-0">
            <DashboardSidebar currentPath={currentPath} onNavigate={onNavigate} isMobile={false} />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
