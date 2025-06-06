"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook to scroll to the top of the page on route changes and page refreshes
 */
export function useScrollTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on page load/refresh and route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" instead of "smooth" to avoid animation on refresh
    })
  }, [pathname]) // Re-run when pathname changes
}
