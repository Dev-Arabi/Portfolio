"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  Loader2,
  Globe,
  Code,
  Network,
  Server,
  Layers,
  MessageSquare,
  Plus,
  DollarSign,
  MessageCircle,
  Zap,
  Calendar,
  AlertCircle,
} from "lucide-react"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.projectType) {
      setError("Please select a project type")
      return false
    }
    if (!formData.message.trim()) {
      setError("Message is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default

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
    }

    loadGSAP()

    // Ultra-smooth hover animations for FAQ cards - 200fps smooth
    const initializeFaqCards = async () => {
      const faqCards = document.querySelectorAll(".faq-card")
      const gsap = (await import("gsap")).default
      faqCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.015,
            y: -2,
            duration: 0.25,
            ease: "power1.out",
            force3D: true,
            transformOrigin: "center center",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: "power1.out",
            force3D: true,
            transformOrigin: "center center",
          })
        })
      })
    }

    initializeFaqCards()
  }, [])

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Message Sent Successfully!</h2>
            <p className="text-slate-300 mb-4">Thank you for reaching out. I will get back to you within 24 hours.</p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Gradient orbs with enhanced blur */}
        <div className="floating-element floating-1 absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-2 absolute top-40 right-20 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-3 absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="floating-element floating-1 absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-2xl"></div>

        {/* Enhanced geometric shapes with glow - Contact themed icons */}
        <div className="floating-element floating-2 absolute top-1/3 left-20 p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
          <Mail className="w-8 h-8 text-blue-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute top-1/2 right-32 p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
          <Phone className="w-10 h-10 text-purple-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute bottom-1/3 left-1/3 p-2 bg-green-500/10 rounded-lg backdrop-blur-sm">
          <MapPin className="w-6 h-6 text-green-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/4 right-1/4 p-2 bg-yellow-500/10 rounded-lg backdrop-blur-sm">
          <MessageCircle className="w-7 h-7 text-yellow-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/4 left-1/5 p-2 bg-indigo-500/10 rounded-lg backdrop-blur-sm">
          <Send className="w-6 h-6 text-indigo-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-3/4 right-1/5 p-3 bg-teal-500/10 rounded-lg backdrop-blur-sm">
          <Globe className="w-8 h-8 text-teal-400/60 drop-shadow-lg" />
        </div>
      </div>
      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <Header
            title="Get In Touch"
            subtitle="Ready to start your next project? Let's discuss how I can help bring your ideas to life."
          />

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Details */}
              <Card className="contact-card bg-slate-800 border border-blue-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-slate-100">
                    <Mail className="h-5 w-5 text-blue-400" />
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Get in touch through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-100">Email</h3>
                      <a href="mailto:your.email@example.com" className="text-blue-400 hover:underline">
                        floyd@maysoon.site
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-100">Phone</h3>
                      <a href="tel:+8801234567890" className="text-blue-400 hover:underline">
                        +880 1303595890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-100">Location</h3>
                      <p className="text-slate-300">Rajshahi, Bangladesh</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-100">Response Time</h3>
                      <p className="text-slate-300">Within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Status Yes */}
              <Card className="contact-card bg-slate-800 border border-green-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-100">Current Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-900/50 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2 border border-green-800">
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="font-medium">Available for new projects</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      I&apos;m currently accepting new projects and collaborations. Let&apos;s discuss your
                      requirements!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Status No 
              <Card className="contact-card bg-slate-800 border border-red-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-100">Current Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-900/50 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2 border border-red-800">
                      <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
                      <span className="font-medium">Not available for new projects</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      I&apos;m currently booked and not accepting new projects. Feel free to reach out for future opportunities or questions.
                    </p>
                  </div>
                </CardContent>
              </Card> */}

              {/* Services Quick Links */}
              <Card className="contact-card bg-slate-800 border border-purple-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-100">Popular Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-300">• Web Development</div>
                    <div className="text-sm text-slate-300">• Backend Development</div>
                    <div className="text-sm text-slate-300">• Network Engineering</div>
                    <div className="text-sm text-slate-300">• Server Management</div>
                    <div className="text-sm text-slate-300">• System Administration</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="contact-card bg-slate-800 border border-slate-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-100">Let&apos;s Start a Conversation</CardTitle>
                  <CardDescription className="text-slate-400">
                    Fill out the form below with your project details and I&apos;ll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-900/50 border border-red-800 rounded-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-300">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="John Doe"
                          required
                          className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@example.com"
                          required
                          className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-slate-300">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          pattern="[0-9+]+"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-slate-300">
                          Company/Organization
                        </label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your Company Name"
                          className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="projectType" className="text-sm font-medium text-slate-300">
                          Project Type *
                        </label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) => handleInputChange("projectType", value)}
                        >
                          <SelectTrigger className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="web-development" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-blue-400" />
                                <span>Web Development</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="backend-development" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <Code className="h-4 w-4 text-green-400" />
                                <span>Backend Development</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="network-engineering" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <Network className="h-4 w-4 text-purple-400" />
                                <span>Network Engineering</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="server-management" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <Server className="h-4 w-4 text-orange-400" />
                                <span>Server Management</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="full-stack" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-red-400" />
                                <span>Full Stack Solution</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="consultation" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-indigo-400" />
                                <span>Consultation</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="other" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4 text-gray-400" />
                                <span>Other</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium text-slate-300">
                          Project Budget
                        </label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="under-1k" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span>Under $1,000</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="1k-5k" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span>$1,000 - $5,000</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="5k-10k" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-yellow-400" />
                                <span>$5,000 - $10,000</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="10k-25k" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-orange-400" />
                                <span>$10,000 - $25,000</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="25k-plus" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-red-400" />
                                <span>$25,000+</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="discuss" className="hover:bg-slate-700 text-slate-100">
                              <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4 text-blue-400" />
                                <span>Let&apos;s Discuss</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="timeline" className="text-sm font-medium text-slate-300">
                        Project Timeline
                      </label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100">
                          <SelectValue placeholder="When do you need this completed?" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="asap" className="hover:bg-slate-700 text-slate-100">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-red-400" />
                              <span>ASAP</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="1-month" className="hover:bg-slate-700 text-slate-100">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-orange-400" />
                              <span>Within 1 month</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="2-3-months" className="hover:bg-slate-700 text-slate-100">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-yellow-400" />
                              <span>2-3 months</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="3-6-months" className="hover:bg-slate-700 text-slate-100">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-green-400" />
                              <span>3-6 months</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="6-months-plus" className="hover:bg-slate-700 text-slate-100">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-400" />
                              <span>6+ months</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="flexible" className="hover:bg-slate-700 text-slate-100">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-purple-400" />
                              <span>Flexible</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-300">
                        Project Description *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please describe your project requirements, goals, and any specific features you need..."
                        rows={6}
                        required
                        className="focus:ring-2 focus:ring-blue-500 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="faq-card bg-slate-800/60 backdrop-blur-sm border border-blue-500/20 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 to-blue-500/80 opacity-5 hover:opacity-10 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                  <h3 className="font-semibold text-slate-100 mb-2">How quickly do you respond?</h3>
                  <p className="text-slate-300 text-sm">
                    I typically respond to all inquiries within 24 hours, often much sooner during business hours.
                  </p>
                </CardContent>
              </Card>
              <Card className="faq-card bg-slate-800/60 backdrop-blur-sm border border-green-500/20 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/80 to-green-500/80 opacity-5 hover:opacity-10 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                  <h3 className="font-semibold text-slate-100 mb-2">Do you work with international clients?</h3>
                  <p className="text-slate-300 text-sm">
                    Yes! I work with clients worldwide and am comfortable with different time zones and communication
                    preferences.
                  </p>
                </CardContent>
              </Card>
              <Card className="faq-card bg-slate-800/60 backdrop-blur-sm border border-purple-500/20 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/80 to-purple-500/80 opacity-5 hover:opacity-10 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                  <h3 className="font-semibold text-slate-100 mb-2">What's your typical project timeline?</h3>
                  <p className="text-slate-300 text-sm">
                    Project timelines vary based on complexity. Small projects typically take 1-2 weeks, while larger
                    ones may take 1-3 months.
                  </p>
                </CardContent>
              </Card>
              <Card className="faq-card bg-slate-800/60 backdrop-blur-sm border border-orange-500/20 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/80 to-orange-500/80 opacity-5 hover:opacity-10 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                  <h3 className="font-semibold text-slate-100 mb-2">Do you provide ongoing support?</h3>
                  <p className="text-slate-300 text-sm">
                    Yes, I offer post-project support and maintenance packages to ensure your solution continues to
                    perform optimally.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
