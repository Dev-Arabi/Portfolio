"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, Quote, Award, Trophy, CheckCircle, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function TestimonialsPage() {
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

        return () => {
          window.removeEventListener("mousemove", handleWindowMouseMove)
        }
      }, containerRef)

      return () => ctx.revert()
    }

    loadGSAP()
  }, [])

  const testimonials = [
    {
      name: "Prof. Md. Abul Quasem",
      initials: "MA",
      role: "Professor",
      company: "University",
      content: "Amazing coding skills! Delivered my project on time with outstanding quality.",
      rating: 5,
      project: "Property Management System",
      image: "/testimonials/Abul_Quasem.jpg",
    },
    {
      name: "Shabnam Sabiha",
      initials: "SS",
      role: "Lecturer",
      company: "Shahdowlla Govt. College",
      content:
        "Execeptional Routine Management system with my full requirements.",
      rating: 4,
      project: "Routine Management",
      image: "/testimonials/ss.jpg",
    },
    {
      name: "Ahanf Talha",
      initials: "AT",
      role: "CEO",
      company: "Nabarang Ltd.",
      content:
        "Excellent fully functional E-Commerce website with the full access of admin backend .",
      rating: 5,
      project: "E-commerce Platform Development",
      image: "/testimonials/ahnaf.jpg",
    },
  ]

  // Bulletproof Image Component with Multiple Fallback Strategies
  const TestimonialImage = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    // Generate a consistent color based on the person's name
    const getInitialsColor = (name: string) => {
      const colors = [
        "from-blue-500 to-blue-600",
        "from-green-500 to-green-600",
        "from-purple-500 to-purple-600",
        "from-pink-500 to-pink-600",
        "from-indigo-500 to-indigo-600",
        "from-teal-500 to-teal-600",
        "from-orange-500 to-orange-600",
        "from-red-500 to-red-600",
      ]
      const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
      return colors[index]
    }

    // If image failed to load or no image provided, show initials
    if (imageError || !testimonial.image) {
      return (
        <div
          className={`w-[60px] h-[60px] rounded-full border-2 border-slate-600 bg-gradient-to-br ${getInitialsColor(testimonial.name)} flex items-center justify-center shadow-lg`}
        >
          <span className="text-white font-bold text-lg drop-shadow-sm">{testimonial.initials}</span>
        </div>
      )
    }

    return (
      <div className="relative w-[60px] h-[60px] rounded-full border-2 border-slate-600 overflow-hidden bg-slate-700 shadow-lg">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getInitialsColor(testimonial.name)} flex items-center justify-center animate-pulse`}
          >
            <span className="text-white font-bold text-lg drop-shadow-sm">{testimonial.initials}</span>
          </div>
        )}

        <Image
          src={testimonial.image || "/placeholder.svg"}
          alt={`${testimonial.name} - ${testimonial.role} at ${testimonial.company}`}
          width={60}
          height={60}
          className={`rounded-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => {
            setImageLoaded(true)
            setImageError(false)
          }}
          onError={(e) => {
            console.log(`Failed to load image for ${testimonial.name}: ${testimonial.image}`)
            setImageError(true)
            setImageLoaded(false)
          }}
          unoptimized={false} // Let Next.js optimize the image
          priority={false} // Don't prioritize testimonial images
        />
      </div>
    )
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

        {/* Enhanced geometric shapes with glow - Testimonials themed icons */}
        <div className="floating-element floating-2 absolute top-1/3 left-20 p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
          <Star className="w-8 h-8 text-blue-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute top-1/2 right-32 p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
          <Quote className="w-10 h-10 text-purple-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute bottom-1/3 left-1/3 p-2 bg-green-500/10 rounded-lg backdrop-blur-sm">
          <Award className="w-6 h-6 text-green-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/4 right-1/4 p-2 bg-yellow-500/10 rounded-lg backdrop-blur-sm">
          <Trophy className="w-7 h-7 text-yellow-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/4 left-1/5 p-2 bg-indigo-500/10 rounded-lg backdrop-blur-sm">
          <CheckCircle className="w-6 h-6 text-indigo-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-3/4 right-1/5 p-3 bg-teal-500/10 rounded-lg backdrop-blur-sm">
          <Heart className="w-8 h-8 text-teal-400/60 drop-shadow-lg" />
        </div>
      </div>

      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <Header title="Client Testimonials" subtitle="What my clients say about my work and professional services" />

          {/* Featured Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-2 border-blue-500 hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="text-center">
                  <Quote className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                  <blockquote className="text-2xl font-medium text-slate-100 mb-6 italic">
                    &quot;Amazing coding skills! Delivered my project on time with outstanding quality.&quot;
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <TestimonialImage testimonial={testimonials[0]} />
                    <div className="text-left">
                      <h3 className="font-semibold text-xl text-slate-100">Prof. Md. Abul Quasem</h3>
                      <p className="text-slate-300">Professor at Rajshahi University</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Testimonials */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.slice(1).map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <TestimonialImage testimonial={testimonial} />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-slate-100">{testimonial.name}</h3>
                      <p className="text-slate-400 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-xs font-medium bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                      Project: {testimonial.project}
                    </span>
                  </div>
                  <blockquote className="text-slate-300 border-l-4 border-blue-500 pl-4 py-1">
                    &quot;{testimonial.content}&quot;
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-slate-300">Happy Clients</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-slate-300">Project Success Rate</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <div className="text-3xl font-bold text-purple-400 mb-2">3+</div>
                <div className="text-slate-300">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-6">Ready to Work Together?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join my satisfied clients and let&apos;s create something amazing together. I&apos;m committed to
              delivering exceptional results for every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  View My Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
