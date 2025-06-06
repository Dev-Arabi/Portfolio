"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top immediately when component mounts (page load/refresh)
    window.scrollTo(0, 0)

    // Also reset scroll position in case of any browser restoration
    if (typeof window !== "undefined") {
      // Force scroll to top with smooth behavior after a tiny delay
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }, 0)
    }
  }, [pathname]) // Runs on every route change

  useEffect(() => {
    // Additional effect for page refresh/reload
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }

    // Reset scroll position on page load
    const handleLoad = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("load", handleLoad)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  return null // This component doesn't render anything
}
