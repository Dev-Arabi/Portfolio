"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTypewriter } from "@/hooks/use-typewriter"

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const typewriterText = useTypewriter({
    text: "Saif Arabi",
    speed: 150,
    deleteSpeed: 100,
    delayBetween: 3000,
  })

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/education", label: "Education" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/services", label: "Services" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

  // Handle mounting and scroll effect
  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeScrolled = scrollTop > 20
      setIsScrolled(shouldBeScrolled)
    }

    // Set initial scroll state
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-in-out",
        isMounted && isScrolled ? "top-0" : "top-6",
      )}
    >
      {/* Main Navigation Bar with Enhanced Blur and Transparency */}
      <nav
        className={cn(
          "shadow-2xl px-4 md:px-6 py-3 w-full max-w-7xl transition-all duration-500 ease-in-out relative overflow-hidden",
          // Enhanced blur and transparency effects with proper rounded corners
          isMounted && isScrolled
            ? "bg-slate-900/70 backdrop-blur-3xl border border-slate-600/40 shadow-2xl rounded-none md:rounded-b-2xl backdrop-saturate-150"
            : "bg-slate-900/60 backdrop-blur-2xl border border-slate-700/30 shadow-xl rounded-2xl backdrop-saturate-125",
          // Additional glass morphism effects
          "backdrop-brightness-110 supports-[backdrop-filter]:bg-slate-900/50",
        )}
        style={{
          backdropFilter:
            isMounted && isScrolled
              ? "blur(24px) saturate(150%) brightness(110%)"
              : "blur(16px) saturate(125%) brightness(105%)",
        }}
      >
        {/* Subtle gradient overlay for extra depth - Fixed rounded corners */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isMounted && isScrolled
              ? "bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-100 rounded-none md:rounded-b-2xl"
              : "bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 opacity-70 rounded-2xl",
          )}
        />

        <div className="flex items-center justify-between w-full relative z-10">
          <div className="flex items-center gap-3">
            {/* Stylized First Letter with Enhanced Glass Effect */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/80 to-purple-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg animate-spin-pause border border-white/10">
              <span className="text-white font-bold text-lg drop-shadow-sm">S</span>
            </div>

            {/* Portfolio Text with Enhanced Contrast */}
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300 whitespace-nowrap flex items-center drop-shadow-sm"
            >
              <span className="min-w-[120px]">
                {typewriterText}
                <span className="animate-pulse text-blue-400">|</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu - SIMPLIFIED for visibility */}
          <div className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 mx-1 rounded-lg text-sm font-medium transition-colors duration-300",
                  pathname === item.href
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-white hover:bg-slate-800/70 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - SIMPLIFIED */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-slate-800/70 rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Dropdown - SIMPLIFIED for visibility */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-3 w-11/12 max-w-sm rounded-2xl shadow-2xl p-4 lg:hidden animate-in slide-in-from-top-2 duration-300 overflow-hidden",
            "backdrop-blur-3xl",
            "bg-slate-900/80 border border-slate-700/50",
          )}
        >
          {/* Gradient overlay for mobile dropdown */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 opacity-70 rounded-2xl" />

          <div className="flex flex-col space-y-1 relative z-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-300",
                  pathname === item.href
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-white hover:bg-slate-800/70 hover:text-white",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigation
export { Navigation }
