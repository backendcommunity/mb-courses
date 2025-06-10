"use client"

import { useState, useEffect } from "react"

export function useMobile(): boolean {
  // Default to false for SSR
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < 768)

      // Function to update state
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Add event listener
      window.addEventListener("resize", handleResize)

      // Clean up
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}

// Export alias for compatibility with shadcn/ui components
export const useIsMobile = useMobile
