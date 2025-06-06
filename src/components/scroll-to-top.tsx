"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"

/**
 * Component that handles scrolling to top on page refresh and navigation
 * This is a "behavior" component with no visual rendering
 */
export default function ScrollToTop() {
  // Use the hook to handle scroll behavior
  useScrollTop()

  // This component doesn't render anything
  return null
}
