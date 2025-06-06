"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if this is a page refresh/reload vs navigation
    const isPageRefresh = (): boolean => {
      try {
        if (typeof window !== "undefined" && window.performance) {
          const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
          return navigation.type === "reload"
        }
      } catch (error) {
        // Fallback for browsers that don't support this API
        console.warn("Performance API not available:", error)
      }
      return false
    }

    // Check if this is the initial page load
    const isInitialLoad = (): boolean => {
      try {
        if (typeof window !== "undefined") {
          return !window.sessionStorage.getItem("hasNavigated")
        }
      } catch (error) {
        // Fallback if sessionStorage is not available
        console.warn("SessionStorage not available:", error)
      }
      return true
    }

    // Only scroll to top on refresh or initial load, not on navigation
    if (isPageRefresh() || isInitialLoad()) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }

    // Mark that navigation has occurred (for subsequent navigations)
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("hasNavigated", "true")
      }
    } catch (error) {
      console.warn("Could not set sessionStorage:", error)
    }
  }, [pathname])

  useEffect(() => {
    // Handle page refresh detection with proper error handling
    const handleBeforeUnload = (): void => {
      try {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("isRefreshing", "true")
        }
      } catch (error) {
        console.warn("Could not set refresh flag:", error)
      }
    }

    // Handle page load after refresh
    const handleLoad = (): void => {
      try {
        if (typeof window !== "undefined") {
          const wasRefreshing = window.sessionStorage.getItem("isRefreshing")
          if (wasRefreshing) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" })
            window.sessionStorage.removeItem("isRefreshing")
          }
        }
      } catch (error) {
        console.warn("Could not handle page load:", error)
      }
    }

    // Handle visibility change (when user comes back to tab)
    const handleVisibilityChange = (): void => {
      try {
        if (document.visibilityState === "visible" && typeof window !== "undefined") {
          const wasRefreshing = window.sessionStorage.getItem("isRefreshing")
          if (wasRefreshing) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" })
            window.sessionStorage.removeItem("isRefreshing")
          }
        }
      } catch (error) {
        console.warn("Could not handle visibility change:", error)
      }
    }

    // Add event listeners with proper cleanup
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload)
      window.addEventListener("load", handleLoad)
      document.addEventListener("visibilitychange", handleVisibilityChange)

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
        window.removeEventListener("load", handleLoad)
        document.removeEventListener("visibilitychange", handleVisibilityChange)
      }
    }
  }, [])

  return null
}
