"use client"

import type React from "react"
import { useState, useEffect } from "react"

const Dashboard: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("/")

  useEffect(() => {
    // Set initial path from URL if available
    if (typeof window !== "undefined") {
      const path = window.location.pathname
      setCurrentPath(path)

      // Handle browser back/forward navigation
      const handlePopState = () => {
        setCurrentPath(window.location.pathname)
      }

      window.addEventListener("popstate", handlePopState)

      return () => {
        window.removeEventListener("popstate", handlePopState)
      }
    }
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Current Path: {currentPath}</p>
      {/* Add navigation or content based on the current path */}
    </div>
  )
}

export default Dashboard
