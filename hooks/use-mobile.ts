"use client"

import { useState, useEffect } from "react"

/**
 * A hook that returns true if the current viewport width is below the mobile breakpoint.
 * @param breakpoint The width in pixels below which a device is considered mobile (default: 768px)
 * @returns A boolean indicating if the current device is a mobile device
 */
export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Function to check if window width is below the breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check on initial render
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [breakpoint])

  return isMobile
}
