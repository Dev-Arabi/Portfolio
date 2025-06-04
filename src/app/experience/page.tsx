"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Server, Code, Database, Terminal, Cpu } from "lucide-react"
import Header from "@/components/header"

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null)

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

        // Create timeline and add the shaky entrance effect for floating elements
        const tl = gsap.timeline({ delay: 0.5 })

        tl.to(".floating-element", {
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
        })

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

        // Hover animations for skills summary cards
        const skillsCards = document.querySelectorAll(".skills-card")
        skillsCards.forEach((card) => {
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs with enhanced blur */}
        <div className="floating-element floating-1 absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-2 absolute top-40 right-20 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-3 absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-1 absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-2xl"></div>

        {/* Enhanced geometric shapes with glow - Experience themed icons */}
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
          <Database className="w-7 h-7 text-yellow-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/4 left-1/5 p-2 bg-indigo-500/10 rounded-lg backdrop-blur-sm">
          <Terminal className="w-6 h-6 text-indigo-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-3/4 right-1/5 p-3 bg-teal-500/10 rounded-lg backdrop-blur-sm">
          <Cpu className="w-8 h-8 text-teal-400/60 drop-shadow-lg" />
        </div>
      </div>

      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <Header title="Professional Experience" subtitle="My journey in the tech industry" />

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Current Position */}
            <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-blue-500 bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <Code className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">Senior Backend Engineer</CardTitle>
                      <CardDescription className="text-lg text-white">UnknownPort</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-900 text-green-300">Current</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white mb-4">2021 - Present (3+ years)</p>
                <p className="text-white mb-4">
                  Leading backend development projects, architecting scalable solutions, and mentoring junior
                  developers.
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Key Responsibilities:</h4>
                  <ul className="space-y-2 text-white">
                    <li>• Designed and implemented RESTful APIs serving 10,000+ daily requests</li>
                    <li>• Architected microservices infrastructure using modern technologies</li>
                    <li>• Optimized database queries resulting in 40% performance improvement</li>
                    <li>• Led code reviews and established development best practices</li>
                    <li>• Mentored 5+ junior developers in backend technologies</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-white mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      PHP
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      MySQL
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Redis
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Docker
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Previous Positions */}
            <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-green-500 bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center">
                    <Network className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Senior Network Engineer</CardTitle>
                    <CardDescription className="text-lg text-white">Drik ICT</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white mb-4">2021 - 2023 (2 years)</p>
                <p className="text-white mb-4">
                  Designed and maintained network infrastructure, implemented security protocols, and optimized network
                  performance.
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Key Achievements:</h4>
                  <ul className="space-y-2 text-white">
                    <li>• Designed network architecture for 500+ user enterprise environment</li>
                    <li>• Implemented security protocols reducing network vulnerabilities by 60%</li>
                    <li>• Optimized network performance achieving 99.9% uptime</li>
                    <li>• Managed Mikrotik routers and switches configuration</li>
                    <li>• Troubleshot complex network issues and provided 24/7 support</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-white mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Mikrotik
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Cisco
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      VLAN
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      VPN
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Firewall
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-purple-500 bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center">
                    <Server className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Senior Server Engineer</CardTitle>
                    <CardDescription className="text-lg text-white">Drik ICT</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white mb-4">2021 - 2023 (2 years)</p>
                <p className="text-white mb-4">
                  Managed server infrastructure, implemented monitoring solutions, and ensured high availability and
                  performance.
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Key Achievements:</h4>
                  <ul className="space-y-2 text-white">
                    <li>• Managed 50+ Linux servers with 99.8% uptime</li>
                    <li>• Implemented automated backup solutions saving 20 hours/week</li>
                    <li>• Set up monitoring systems for proactive issue detection</li>
                    <li>• Optimized server performance reducing response time by 35%</li>
                    <li>• Implemented security hardening protocols</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-white mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Linux
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Apache
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Nginx
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      MySQL
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-white">
                      Monitoring Tools
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Summary */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Skills Summary</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="skills-card bg-slate-800 p-6 rounded-lg shadow-lg text-center border border-slate-700">
                <div className="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Backend Development</h3>
                <p className="text-white">3+ years of experience in building scalable backend systems</p>
              </div>
              <div className="skills-card bg-slate-800 p-6 rounded-lg shadow-lg text-center border border-slate-700">
                <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Network Engineering</h3>
                <p className="text-white">Expert in network design, security, and optimization</p>
              </div>
              <div className="skills-card bg-slate-800 p-6 rounded-lg shadow-lg text-center border border-slate-700">
                <div className="w-16 h-16 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Server Management</h3>
                <p className="text-white">Proficient in Linux server administration and monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
