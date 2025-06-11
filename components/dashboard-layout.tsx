"use client";

import type React from "react";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { NavigationBar } from "@/components/navigation-bar";
import { useMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function DashboardLayout({
  children,
  currentPath,
  onNavigate,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMobile();

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (path: string) => {
    onNavigate(path);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-72 flex-shrink-0"
        }`}
      >
        <DashboardSidebar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          isMobile={isMobile}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <NavigationBar
          onNavigate={handleNavigate}
          onMenuToggle={handleMenuToggle}
          isMobile={isMobile}
        />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
