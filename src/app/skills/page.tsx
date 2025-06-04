"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Network, Server, Globe, Wrench } from "lucide-react"
import Header from "@/components/header"

export default function SkillsPage() {
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

        // Hover animations for continuous learning cards
        const learningCards = document.querySelectorAll(".learning-card")
        learningCards.forEach((card) => {
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Globe,
      color: "blue",
      skills: ["NextJS", "React", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    },
    {
      title: "Backend Development",
      icon: Code,
      color: "green",
      skills: ["PHP", "Node.js", "Express.js", "RESTful APIs", "Microservices", "Authentication"],
    },
    {
      title: "Database Management",
      icon: Database,
      color: "purple",
      skills: ["MySQL", "PostgreSQL", "Redis", "Database Design", "Query Optimization", "Backup Strategies"],
    },
    {
      title: "Network Engineering",
      icon: Network,
      color: "orange",
      skills: ["Mikrotik", "Cisco", "VLAN Configuration", "VPN Setup", "Firewall Management", "Network Security"],
    },
    {
      title: "Server Administration",
      icon: Server,
      color: "red",
      skills: ["Linux", "Ubuntu", "CentOS", "Apache", "Nginx", "System Monitoring", "Performance Tuning"],
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      color: "indigo",
      skills: ["Git", "Docker", "SSH", "Bash Scripting", "Cron Jobs", "SSL Certificates"],
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-900/50 text-blue-400 border-blue-800",
      green: "bg-green-900/50 text-green-400 border-green-800",
      purple: "bg-purple-900/50 text-purple-400 border-purple-800",
      orange: "bg-orange-900/50 text-orange-400 border-orange-800",
      red: "bg-red-900/50 text-red-400 border-red-800",
      indigo: "bg-indigo-900/50 text-indigo-400 border-indigo-800",
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

        {/* Enhanced geometric shapes with glow - Skills themed icons */}
        <div className="floating-element floating-2 absolute top-1/3 left-20 p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
          <Code className="w-8 h-8 text-blue-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute top-1/2 right-32 p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
          <Database className="w-10 h-10 text-purple-400/60 drop-shadow-lg" />
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
          <Wrench className="w-8 h-8 text-teal-400/60 drop-shadow-lg" />
        </div>
      </div>

      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <Header
            title="Technical Skills"
            subtitle="Technologies and tools I work with to create amazing digital experiences"
          />

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-shadow border-2 hover:border-slate-600 bg-slate-800 border-slate-700"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(category.color)}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-slate-100">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="hover:bg-slate-700 transition-colors cursor-default border-slate-600 text-slate-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Proficiency Levels */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Proficiency Levels</h2>
            <div className="space-y-6">
              {[
                { skill: "PHP & Backend Development", level: 95 },
                { skill: "Network Engineering (Mikrotik)", level: 90 },
                { skill: "Linux Server Administration", level: 88 },
                { skill: "NextJS & Frontend Development", level: 85 },
                { skill: "Database Management", level: 82 },
                { skill: "System Security & Monitoring", level: 80 },
              ].map((item, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-slate-100">{item.skill}</span>
                    <span className="text-slate-300">{item.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Learning */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Continuous Learning</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="learning-card bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Currently Learning</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Advanced React Patterns</li>
                  <li>• Cloud Infrastructure (AWS)</li>
                  <li>• DevOps Practices</li>
                  <li>• Machine Learning Basics</li>
                  <li>• Advanced Database Optimization</li>
                </ul>
              </div>
              <div className="learning-card bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Professional Goals</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Full Stack Architecture Mastery</li>
                  <li>• Cloud Certification (AWS/Azure)</li>
                  <li>• Advanced Network Security</li>
                  <li>• Team Leadership Skills</li>
                  <li>• Open Source Contributions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
