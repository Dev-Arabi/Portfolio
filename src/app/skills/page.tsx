"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Network, Server, Globe, Wrench, BookOpen, Target } from "lucide-react"
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

        // Ultra-smooth hover animations for continuous learning cards - 200fps smooth
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

        // Ultra-smooth hover animations for proficiency cards - 200fps smooth
        const proficiencyCards = document.querySelectorAll(".proficiency-card")
        proficiencyCards.forEach((card) => {
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

        // Animate progress bars on scroll/load
        const animateProgressBars = () => {
          const progressBars = document.querySelectorAll(".progress-bar")
          progressBars.forEach((bar, index) => {
            const percentage = bar.getAttribute("data-percentage")
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: `${percentage}%`,
                duration: 1.5,
                delay: index * 0.2,
                ease: "power2.out",
              },
            )
          })
        }

        // Trigger progress bar animation after a delay
        setTimeout(animateProgressBars, 1000)

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
      color: "from-blue-400/80 to-blue-500/80",
      bgColor: "bg-blue-900/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
      skills: ["NextJS", "React", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    },
    {
      title: "Backend Development",
      icon: Code,
      color: "from-green-400/80 to-green-500/80",
      bgColor: "bg-green-900/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-green-900/30",
      skills: ["PHP", "Node.js", "Express.js", "RESTful APIs", "Microservices", "Authentication"],
    },
    {
      title: "Database Management",
      icon: Database,
      color: "from-purple-400/80 to-purple-500/80",
      bgColor: "bg-purple-900/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-900/30",
      skills: ["MySQL", "PostgreSQL", "Redis", "Database Design", "Query Optimization", "Backup Strategies"],
    },
    {
      title: "Network Engineering",
      icon: Network,
      color: "from-orange-400/80 to-orange-500/80",
      bgColor: "bg-orange-900/10",
      borderColor: "border-orange-500/20",
      iconBg: "bg-orange-900/30",
      skills: ["Mikrotik", "Cisco", "VLAN Configuration", "VPN Setup", "Firewall Management", "Network Security"],
    },
    {
      title: "Server Administration",
      icon: Server,
      color: "from-red-400/80 to-red-500/80",
      bgColor: "bg-red-900/10",
      borderColor: "border-red-500/20",
      iconBg: "bg-red-900/30",
      skills: ["Linux", "Ubuntu", "CentOS", "Apache", "Nginx", "System Monitoring", "Performance Tuning"],
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      color: "from-indigo-400/80 to-indigo-500/80",
      bgColor: "bg-indigo-900/10",
      borderColor: "border-indigo-500/20",
      iconBg: "bg-indigo-900/30",
      skills: ["Git", "Docker", "SSH", "Bash Scripting", "Cron Jobs", "SSL Certificates"],
    },
  ]

  const proficiencyData = [
    {
      skill: "NextJS & Frontend Development",
      level: 95,
      icon: Globe,
      color: "from-orange-400/80 to-orange-500/80",
      bgColor: "bg-orange-900/10",
      borderColor: "border-orange-500/20",
      textColor: "text-orange-300",
    },
    {
      skill: "PHP & Backend Development",
      level: 90,
      icon: Code,
      color: "from-slate-400 to-slate-500",
      bgColor: "bg-slate-800/40",
      borderColor: "border-slate-600/40",
      textColor: "text-slate-300",
    },
    {
      skill: "Database Management",
      level: 87,
      icon: Database,
      color: "from-pink-400/80 to-pink-500/80",
      bgColor: "bg-pink-900/10",
      borderColor: "border-pink-500/20",
      textColor: "text-pink-300",
    },
    {
      skill: "Network Engineering (Mikrotik)",
      level: 82,
      icon: Network,
      color: "from-blue-400/80 to-blue-500/80",
      bgColor: "bg-blue-900/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-300",
    },
    {
      skill: "Linux Server Administration",
      level: 80,
      icon: Server,
      color: "from-purple-400/80 to-purple-500/80",
      bgColor: "bg-purple-900/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-300",
    },
    {
      skill: "System Security & Monitoring",
      level: 80,
      icon: Wrench,
      color: "from-indigo-400/80 to-indigo-500/80",
      bgColor: "bg-indigo-900/10",
      borderColor: "border-indigo-500/20",
      textColor: "text-indigo-300",
    },
  ]

  const learningData = [
    {
      title: "Currently Learning",
      icon: BookOpen,
      color: "from-teal-400/80 to-teal-500/80",
      bgColor: "bg-teal-900/10",
      borderColor: "border-teal-500/20",
      iconBg: "bg-teal-900/30",
      items: [
        "Advanced React Patterns",
        "Cloud Infrastructure (AWS)",
        "DevOps Practices",
        "Machine Learning Basics",
        "Advanced Database Optimization",
      ],
    },
    {
      title: "Professional Goals",
      icon: Target,
      color: "from-cyan-400/80 to-cyan-500/80",
      bgColor: "bg-cyan-900/10",
      borderColor: "border-cyan-500/20",
      iconBg: "bg-cyan-900/30",
      items: [
        "Full Stack Architecture Mastery",
        "Cloud Certification (AWS/Azure)",
        "Advanced Network Security",
        "Team Leadership Skills",
        "Open Source Contributions",
      ],
    },
  ]

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

          {/* Enhanced Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <div
                  key={index}
                  className={`skills-card ${category.bgColor} ${category.borderColor} p-6 rounded-xl shadow-lg border backdrop-blur-sm relative overflow-hidden bg-slate-800/60`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${category.iconBg} flex items-center justify-center shadow-lg bg-gradient-to-r ${category.color}`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-100">{category.title}</h3>
                      </div>
                    </div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="cursor-default border-slate-600/50 text-slate-300 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Enhanced Proficiency Levels */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Proficiency Levels</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {proficiencyData.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className={`proficiency-card ${item.bgColor} ${item.borderColor} p-6 rounded-xl shadow-lg border backdrop-blur-sm relative overflow-hidden group bg-slate-800/60`}
                  >
                    {/* Subtle gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                          >
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-100 text-lg">{item.skill}</h3>
                            <p className="text-slate-400 text-sm">Professional Level</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                          >
                            {item.level}%
                          </span>
                          <p className="text-slate-400 text-xs">Proficiency</p>
                        </div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden shadow-inner">
                          <div
                            className={`progress-bar h-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg relative overflow-hidden`}
                            data-percentage={item.level}
                            style={{ width: "0%" }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                          </div>
                        </div>

                        {/* Progress indicator dots */}
                        <div className="flex justify-between mt-2 px-1">
                          {[20, 40, 60, 80, 100].map((mark) => (
                            <div
                              key={mark}
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                item.level >= mark ? `bg-gradient-to-r ${item.color}` : "bg-slate-600"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Skill level description */}
                      <div className="mt-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.color} text-white shadow-md`}
                        >
                          {item.level >= 90
                            ? "Expert"
                            : item.level >= 80
                              ? "Advanced"
                              : item.level >= 70
                                ? "Intermediate"
                                : "Beginner"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Enhanced Continuous Learning Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Continuous Learning</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {learningData.map((section, index) => {
                const IconComponent = section.icon
                return (
                  <div
                    key={index}
                    className={`learning-card ${section.bgColor} ${section.borderColor} p-6 rounded-xl shadow-lg border backdrop-blur-sm relative overflow-hidden group bg-slate-800/60`}
                  >
                    {/* Subtle gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${section.iconBg} flex items-center justify-center shadow-lg bg-gradient-to-r ${section.color}`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-100">{section.title}</h3>
                        </div>
                      </div>

                      {/* Learning items */}
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-slate-300">
                            <span className="text-slate-500 mt-1">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
