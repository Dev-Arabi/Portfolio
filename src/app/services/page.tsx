"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, Code, Network, Server, Globe, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"

export default function ServicesPage() {
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

        // Hover animations for "Why Choose Me?" section cards
        const whyChooseMeCards = document.querySelectorAll(".why-choose-me-card")
        whyChooseMeCards.forEach((card) => {
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

  const services = [
    {
      icon: Palette,
      title: "Web Design & Development",
      description:
        "I create visually appealing and user-friendly websites that reflect your brand's identity and engage your visitors effectively.",
      features: ["Responsive Design", "Modern UI/UX", "SEO Optimized", "Fast Loading"],
      color: "blue",
      price: "Starting from $500",
    },
    {
      icon: Code,
      title: "Backend Development",
      description:
        "From APIs to database design, I offer backend solutions that are scalable, optimized, and tailored to your project needs.",
      features: ["RESTful APIs", "Database Design", "Performance Optimization", "Security Implementation"],
      color: "green",
      price: "Starting from $800",
    },
    {
      icon: Network,
      title: "Network Engineering",
      description:
        "I provide networking solutions, including server setups, configuration, and troubleshooting, to ensure smooth connectivity and security.",
      features: ["Network Design", "Mikrotik Configuration", "VPN Setup", "Security Protocols"],
      color: "purple",
      price: "Starting from $600",
    },
    {
      icon: Server,
      title: "Server Management",
      description:
        "Complete server administration services including setup, monitoring, maintenance, and optimization for maximum performance.",
      features: ["Linux Administration", "Performance Monitoring", "Backup Solutions", "Security Hardening"],
      color: "orange",
      price: "Starting from $400",
    },
    {
      icon: Globe,
      title: "Full Stack Solutions",
      description:
        "End-to-end web application development combining frontend and backend expertise for complete digital solutions.",
      features: ["Complete Web Apps", "Database Integration", "User Authentication", "Deployment"],
      color: "red",
      price: "Starting from $1200",
    },
    {
      icon: Shield,
      title: "Security Consulting",
      description:
        "Comprehensive security assessment and implementation to protect your digital assets and ensure compliance.",
      features: ["Security Audits", "Vulnerability Assessment", "SSL Implementation", "Firewall Configuration"],
      color: "indigo",
      price: "Starting from $300",
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-900/50 text-blue-400",
      green: "bg-green-900/50 text-green-400",
      purple: "bg-purple-900/50 text-purple-400",
      orange: "bg-orange-900/50 text-orange-400",
      red: "bg-red-900/50 text-red-400",
      indigo: "bg-indigo-900/50 text-indigo-400",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

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

        {/* Enhanced geometric shapes with glow - Services themed icons */}
        <div className="floating-element floating-2 absolute top-1/3 left-20 p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
          <Palette className="w-8 h-8 text-blue-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute top-1/2 right-32 p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
          <Code className="w-10 h-10 text-purple-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute bottom-1/3 left-1/3 p-2 bg-green-500/10 rounded-lg backdrop-blur-sm">
          <Network className="w-6 h-6 text-green-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/4 right-1/4 p-2 bg-yellow-500/10 rounded-lg backdrop-blur-sm">
          <Server className="w-7 h-7 text-yellow-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/4 left-1/5 p-2 bg-indigo-500/10 rounded-lg backdrop-blur-sm">
          <Globe className="w-6 h-6 text-indigo-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-3/4 right-1/5 p-3 bg-teal-500/10 rounded-lg backdrop-blur-sm">
          <Shield className="w-8 h-8 text-teal-400/60 drop-shadow-lg" />
        </div>
      </div>

      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <Header
            title="My Services"
            subtitle="Professional services tailored to help you achieve your digital goals"
          />

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-shadow border-2 hover:border-slate-600 group bg-slate-800 border-slate-700 flex flex-col h-full"
                >
                  <CardHeader className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 ${getColorClasses(service.color)} group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl text-center text-slate-100">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col">
                    {/* Description - Fixed height area */}
                    <div className="h-20 flex items-center justify-center mb-6">
                      <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>
                    </div>

                    {/* What's Included - Fixed position */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-100 mb-3">What's Included:</h4>
                      <div className="flex flex-wrap gap-2 justify-center min-h-[80px] items-start">
                        {service.features.map((feature, featureIndex) => (
                          <Badge
                            key={featureIndex}
                            variant="outline"
                            className="text-xs border-slate-600 text-slate-300"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and Button - Always at bottom */}
                    <div className="border-t border-slate-700 pt-4 mt-auto">
                      <p className="text-lg font-semibold text-slate-100 mb-4">{service.price}</p>
                      <Link href="/contact">
                        <Button className="w-full group-hover:bg-slate-700 transition-colors bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Process Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">My Work Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discovery", description: "Understanding your needs and project requirements" },
                { step: "02", title: "Planning", description: "Creating detailed project roadmap and timeline" },
                { step: "03", title: "Development", description: "Building your solution with regular updates" },
                { step: "04", title: "Delivery", description: "Testing, deployment, and ongoing support" },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{process.title}</h3>
                  <p className="text-slate-300 text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Me */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Why Choose Me?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="why-choose-me-card bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Professional Excellence</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• 3+ years of professional experience</li>
                  <li>• Proven track record with 50+ completed projects</li>
                  <li>• 100% client satisfaction rate</li>
                  <li>• Continuous learning and skill development</li>
                </ul>
              </div>
              <div className="why-choose-me-card bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Service Commitment</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Clear communication throughout the project</li>
                  <li>• On-time delivery and within budget</li>
                  <li>• Post-project support and maintenance</li>
                  <li>• Flexible and adaptable to your needs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-slate-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto border border-slate-700">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Start Your Project?</h2>
            <p className="text-slate-300 mb-6">
              Let&apos;s discuss your requirements and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="/experience">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  View My Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
