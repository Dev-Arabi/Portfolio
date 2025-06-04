"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTypewriter } from "@/hooks/use-typewriter"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4">
      {/* Main Navigation Bar */}
      <nav className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl px-4 md:px-6 py-3 w-full max-w-7xl">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {/* Stylized First Letter with Custom Spin-Pause Animation */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg animate-spin-pause">
              <span className="text-white font-bold text-lg">S</span>
            </div>

            {/* Portfolio Text */}
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300 whitespace-nowrap flex items-center"
            >
              <span className="min-w-[120px]">
                {typewriterText}
                <span className="animate-pulse text-blue-400">|</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Right Aligned with subtle hover effects */}
          <div className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative transition-all duration-300 rounded-lg text-sm font-medium whitespace-nowrap px-3 py-2",
                  "text-slate-300 hover:text-white",
                  "before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-lg before:opacity-0 before:transition-opacity before:duration-300",
                  "hover:before:opacity-100",
                  pathname === item.href && "text-white bg-slate-800/70",
                )}
              >
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-300"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Dropdown with smooth animation */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-11/12 max-w-sm bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl p-4 lg:hidden animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-all duration-300 rounded-lg text-sm font-medium whitespace-nowrap px-4 py-3",
                  "text-slate-300 hover:text-white hover:bg-slate-800/50",
                  pathname === item.href && "text-white bg-slate-800/70",
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
