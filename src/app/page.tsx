"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Code, Server, Network, Sparkles, Zap, Database } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamic import of GSAP to avoid SSR issues
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default
      const { TextPlugin } = await import("gsap/TextPlugin")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      // Register GSAP plugins
      gsap.registerPlugin(TextPlugin, ScrollTrigger)

      const ctx = gsap.context(() => {
        // Enhanced initial states with more sophisticated positioning
        gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
          opacity: 0,
          y: 60,
          rotationX: 15,
          transformPerspective: 1000,
        })

        gsap.set(".nav-card", {
          opacity: 0,
          y: 40,
          scale: 0.8,
          rotationY: 15,
          transformPerspective: 1000,
        })

        gsap.set(".floating-element", {
          opacity: 0,
          scale: 0,
          rotation: () => gsap.utils.random(-180, 180),
        })

        // Set initial state for subtitle words
        gsap.set(".subtitle-word", {
          opacity: 0,
          y: 20,
          rotationX: 45,
          transformPerspective: 1000,
        })

        // Create enhanced main timeline with proper sequencing
        const tl = gsap.timeline()

        // STEP 1: Show title container first
        tl.to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0,
        )

        // STEP 2: Typewriter effect for the main title (happens first)
        tl.to(
          ".gradient-text",
          {
            text: "Full Stack Developer & Network Engineer",
            duration: 3.5,
            ease: "none",
          },
          "+=0.5",
        )

        // STEP 3: After title is complete, animate subtitle with word-by-word effect
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "+=0.3",
        ).to(
          ".subtitle-word",
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            stagger: {
              amount: 1.5,
              from: "start",
              ease: "power2.out",
            },
            ease: "back.out(1.4)",
          },
          "-=0.5",
        )

        // STEP 4: Animate buttons
        tl.to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )

        // STEP 5: Animate navigation cards
        tl.to(
          ".nav-card",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: {
              amount: 0.6,
              from: "center",
              ease: "power2.out",
            },
            ease: "back.out(1.4)",
          },
          "-=0.6",
        )

        // STEP 6: Finally animate floating elements
        tl.to(
          ".floating-element",
          {
            opacity: 0.7,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            stagger: {
              amount: 1,
              from: "random",
              ease: "power2.out",
            },
            ease: "elastic.out(1, 0.3)",
          },
          "-=1.0",
        )

        // Continuous floating animations (start after everything is loaded)
        tl.call(() => {
          gsap.to(".floating-1", {
            y: -30,
            x: 15,
            rotation: 10,
            scale: 1.1,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })

          gsap.to(".floating-2", {
            y: 25,
            x: -20,
            rotation: -8,
            scale: 0.9,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })

          gsap.to(".floating-3", {
            y: -35,
            x: 25,
            rotation: 12,
            scale: 1.05,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        })

        // Cursor blink animation (starts immediately)
        gsap.to(".cursor-blink", {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        })

        // Enhanced hover animations for cards with magnetic effect
        const cards = document.querySelectorAll(".nav-card")
        cards.forEach((card) => {
          const icon = card.querySelector(".card-icon")
          const content = card.querySelector(".card-content")
          const overlay = card.querySelector(".card-overlay")

          // Magnetic effect on mouse move - Properly typed event handler
          const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent
            const rect = (card as HTMLElement).getBoundingClientRect()
            const x = mouseEvent.clientX - rect.left - rect.width / 2
            const y = mouseEvent.clientY - rect.top - rect.height / 2

            gsap.to(card, {
              x: x * 0.1,
              y: y * 0.1,
              duration: 0.3,
              ease: "power2.out",
            })
          }

          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.08,
              y: -8,
              rotationY: 5,
              z: 50,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(icon, {
              scale: 1.3,
              rotation: 10,
              y: -5,
              duration: 0.4,
              ease: "back.out(1.7)",
            })
            gsap.to(content, {
              y: -3,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(overlay, {
              opacity: 1,
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out",
            })
          }

          const handleMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              x: 0,
              rotationY: 0,
              z: 0,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(content, {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(overlay, {
              opacity: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            })
          }

          card.addEventListener("mousemove", handleMouseMove)
          card.addEventListener("mouseenter", handleMouseEnter)
          card.addEventListener("mouseleave", handleMouseLeave)
        })

        // Enhanced button hover animations with ripple effect
        const buttons = document.querySelectorAll(".animated-button")
        buttons.forEach((button) => {
          const handleMouseEnter = () => {
            gsap.to(button, {
              scale: 1.08,
              y: -2,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              duration: 0.3,
              ease: "power2.out",
            })
          }

          const handleMouseLeave = () => {
            gsap.to(button, {
              scale: 1,
              y: 0,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
              ease: "power2.out",
            })
          }

          // Click ripple effect - Properly typed event handler
          const handleClick = (e: Event) => {
            const mouseEvent = e as MouseEvent
            const rect = (button as HTMLElement).getBoundingClientRect()
            const x = mouseEvent.clientX - rect.left
            const y = mouseEvent.clientY - rect.top

            const ripple = document.createElement("div")
            ripple.style.position = "absolute"
            ripple.style.borderRadius = "50%"
            ripple.style.background = "rgba(255, 255, 255, 0.6)"
            ripple.style.transform = "scale(0)"
            ripple.style.left = x + "px"
            ripple.style.top = y + "px"
            ripple.style.width = "20px"
            ripple.style.height = "20px"
            ripple.style.marginLeft = "-10px"
            ripple.style.marginTop = "-10px"
            ripple.style.pointerEvents = "none"

            button.appendChild(ripple)

            gsap.to(ripple, {
              scale: 10,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => ripple.remove(),
            })
          }

          button.addEventListener("mouseenter", handleMouseEnter)
          button.addEventListener("mouseleave", handleMouseLeave)
          button.addEventListener("click", handleClick)
        })

        // Parallax effect for floating elements
        const handleWindowMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2
          const y = (e.clientY / window.innerHeight - 0.5) * 2

          gsap.to(".floating-1", {
            x: x * 20,
            y: y * 20,
            duration: 1,
            ease: "power2.out",
          })

          gsap.to(".floating-2", {
            x: x * -15,
            y: y * -15,
            duration: 1.2,
            ease: "power2.out",
          })

          gsap.to(".floating-3", {
            x: x * 25,
            y: y * 25,
            duration: 0.8,
            ease: "power2.out",
          })
        }

        window.addEventListener("mousemove", handleWindowMouseMove)

        // Cleanup function to remove event listeners
        return () => {
          window.removeEventListener("mousemove", handleWindowMouseMove)

          cards.forEach((card) => {
            const handleMouseMove = (e: Event) => {
              const mouseEvent = e as MouseEvent
              const rect = (card as HTMLElement).getBoundingClientRect()
              const x = mouseEvent.clientX - rect.left - rect.width / 2
              const y = mouseEvent.clientY - rect.top - rect.height / 2

              gsap.to(card, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: "power2.out",
              })
            }

            card.removeEventListener("mousemove", handleMouseMove)
          })
        }
      }, containerRef)

      return () => ctx.revert()
    }

    loadGSAP()
  }, [])

  // Helper function to split text into words for animation
  const splitTextIntoWords = (text: string) => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="subtitle-word inline-block mr-1">
        {word}
      </span>
    ))
  }

  return (
    <div
      ref={containerRef}
      className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden relative"
      style={{ perspective: "1000px" }}
    >
      {/* Enhanced Floating Background Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs with enhanced blur */}
        <div className="floating-element floating-1 absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-2 absolute top-40 right-20 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-3 absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-1 absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-2xl"></div>

        {/* Enhanced geometric shapes with glow */}
        <div className="floating-element floating-2 absolute top-1/3 left-20 p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
          <Code className="w-8 h-8 text-blue-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute top-1/2 right-32 p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
          <Server className="w-10 h-10 text-purple-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute bottom-1/3 left-1/3 p-2 bg-green-500/10 rounded-lg backdrop-blur-sm">
          <Network className="w-6 h-6 text-green-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/4 right-1/4 p-2 bg-yellow-500/10 rounded-lg backdrop-blur-sm">
          <Sparkles className="w-7 h-7 text-yellow-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/4 left-1/5 p-2 bg-indigo-500/10 rounded-lg backdrop-blur-sm">
          <Zap className="w-6 h-6 text-indigo-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-3/4 right-1/5 p-3 bg-teal-500/10 rounded-lg backdrop-blur-sm">
          <Database className="w-8 h-8 text-teal-400/60 drop-shadow-lg" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-16 relative z-10">
        <div className="container mx-auto text-center">
          <div ref={heroRef} className="max-w-4xl mx-auto">
            <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 gradient-text">
                {/* Text will be animated here */}
              </span>
              <span className="cursor-blink text-blue-400">|</span>
            </h1>
            <p ref={subtitleRef} className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {splitTextIntoWords(
                "Passionate Computer Science student with expertise in backend development, networking, and server management. Currently pursuing B.Sc. in CSE while delivering professional solutions.",
              )}
            </p>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="animated-button relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
              </Link>
              <Link href="/experience">
                <Button
                  size="lg"
                  variant="outline"
                  className="animated-button relative overflow-hidden border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white backdrop-blur-sm bg-slate-800/30 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Enhanced Quick Navigation Cards */}
            <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Link href="/about" className="nav-card group">
                <div className="text-center p-6 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-2xl transition-all duration-500 group-hover:border-blue-500/50 relative overflow-hidden">
                  {/* Enhanced hover effect overlay */}
                  <div className="card-overlay absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500"></div>

                  <div className="card-icon w-16 h-16 bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-800/70 group-hover:to-blue-700/70 transition-all duration-300 relative z-10 shadow-lg">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div className="card-content relative z-10">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      About Me
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Learn about my background
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/skills" className="nav-card group">
                <div className="text-center p-6 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-2xl transition-all duration-500 group-hover:border-green-500/50 relative overflow-hidden">
                  <div className="card-overlay absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 transition-opacity duration-500"></div>

                  <div className="card-icon w-16 h-16 bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-800/70 group-hover:to-green-700/70 transition-all duration-300 relative z-10 shadow-lg">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="card-content relative z-10">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-green-300 transition-colors duration-300">
                      My Skills
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Technologies I work with
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/services" className="nav-card group">
                <div className="text-center p-6 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-2xl transition-all duration-500 group-hover:border-purple-500/50 relative overflow-hidden">
                  <div className="card-overlay absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500"></div>

                  <div className="card-icon w-16 h-16 bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-800/70 group-hover:to-purple-700/70 transition-all duration-300 relative z-10 shadow-lg">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div className="card-content relative z-10">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      Services
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      What I can do for you
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
