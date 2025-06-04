"use client"

import { useEffect, useRef } from "react"
import Header from "@/components/header"
import Image from "next/image"
import { Heart, Smile, ThumbsUp, Crown, Zap, Shield, Star, Target, Coffee } from "lucide-react"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default

      const ctx = gsap.context(() => {
        // Set initial states for floating elements with random rotation (for shaky effect)
        gsap.set(".floating-element", {
          opacity: 0,
          scale: 0,
          rotation: () => gsap.utils.random(-180, 180),
        })

        // Set initial states for content
        gsap.set([imageRef.current, contentRef.current, statsRef.current], {
          opacity: 0,
          y: 30,
          rotationX: 10,
          transformPerspective: 1000,
        })

        // Create timeline for content animation
        const tl = gsap.timeline()

        tl.to(imageRef.current, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
        })
          .to(
            contentRef.current,
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.7",
          )
          .to(
            ".stat-card",
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(1.4)",
            },
            "-=0.5",
          )
          // Add the shaky entrance effect for floating elements
          .to(
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

        // Continuous floating animations (start after entrance)
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

        // Hover animations for stat cards
        const statCards = document.querySelectorAll(".stat-card")
        statCards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })

        return () => {
          window.removeEventListener("mousemove", handleWindowMouseMove)
        }
      }, containerRef)

      return () => ctx.revert()
    }

    loadGSAP()
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative overflow-hidden"
    >
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs with enhanced blur */}
        <div className="floating-element floating-1 absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-2 absolute top-40 right-20 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-3 absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-1 absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-2xl"></div>

        {/* Enhanced geometric shapes with glow - Self-respect and personal growth themed icons */}
        <div className="floating-element floating-2 absolute top-1/3 left-20 p-3 bg-pink-500/10 rounded-lg backdrop-blur-sm">
          <Heart className="w-8 h-8 text-pink-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute top-1/2 right-32 p-3 bg-yellow-500/10 rounded-lg backdrop-blur-sm">
          <Smile className="w-10 h-10 text-yellow-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute bottom-1/3 left-1/3 p-2 bg-green-500/10 rounded-lg backdrop-blur-sm">
          <ThumbsUp className="w-6 h-6 text-green-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/4 right-1/4 p-2 bg-amber-500/10 rounded-lg backdrop-blur-sm">
          <Crown className="w-7 h-7 text-amber-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/4 left-1/5 p-2 bg-purple-500/10 rounded-lg backdrop-blur-sm">
          <Zap className="w-6 h-6 text-purple-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-3/4 right-1/5 p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
          <Shield className="w-8 h-8 text-blue-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/6 left-1/2 p-2 bg-indigo-500/10 rounded-lg backdrop-blur-sm">
          <Star className="w-6 h-6 text-indigo-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/6 right-1/3 p-2 bg-teal-500/10 rounded-lg backdrop-blur-sm">
          <Target className="w-7 h-7 text-teal-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-2/3 left-1/6 p-2 bg-orange-500/10 rounded-lg backdrop-blur-sm">
          <Coffee className="w-6 h-6 text-orange-400/60 drop-shadow-lg" />
        </div>
      </div>

      {/* Main Content - Takes full height minus navigation */}
      <div className="flex-1 flex items-center justify-center px-4 pt-16 relative z-10">
        <div className="container mx-auto">
          <Header title="About Me" subtitle="Learn about my background and journey in technology" />

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div ref={imageRef} className="order-2 md:order-1">
                {/* Replace the div with an actual image */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto overflow-hidden rounded-full border-4 border-blue-500 shadow-2xl">
                  <Image
                    src="/my_image.jpg?height=400&width=400"
                    alt="Your Name"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Replace the src above with your actual image path when you have one */}
                </div>
              </div>

              <div ref={contentRef} className="space-y-4 order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Hello, I'm a Full Stack Developer</h2>
                <p className="text-slate-300 leading-relaxed">
                  I'm a dedicated Computer Science student with hands-on experience in backend development, network
                  engineering, and server management. I combine academic knowledge with real-world expertise to deliver
                  high-quality solutions.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Currently pursuing my B.Sc. in Computer Science and Engineering at Varendra University Rajshahi, I
                  have been working professionally since 2021, gaining valuable experience in various aspects of
                  software development and network infrastructure.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="stat-card text-center p-4 bg-slate-800/70 rounded-lg shadow-lg border border-slate-700 opacity-0">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">3+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
              <div className="stat-card text-center p-4 bg-slate-800/70 rounded-lg shadow-lg border border-slate-700 opacity-0">
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">50+</div>
                <div className="text-sm text-slate-400">Projects Completed</div>
              </div>
              <div className="stat-card text-center p-4 bg-slate-800/70 rounded-lg shadow-lg border border-slate-700 opacity-0">
                <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">100%</div>
                <div className="text-sm text-slate-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
