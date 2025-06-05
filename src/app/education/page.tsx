"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, Award, BookOpen, Trophy, Star, Target, Lightbulb, Brain, Medal } from "lucide-react"
import Header from "@/components/header"

export default function EducationPage() {
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

        // Set initial states for education cards and highlights
        gsap.set(".education-card", {
          opacity: 0,
          x: (index: number) => (index % 2 === 0 ? -50 : 50),
          rotationY: (index: number) => (index % 2 === 0 ? -15 : 15),
          transformPerspective: 1000,
        })

        gsap.set(".highlight-card", {
          opacity: 0,
          y: 30,
          scale: 0.9,
        })

        // Create main timeline
        const tl = gsap.timeline()

        // Animate education cards
        tl.to(".education-card", {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          delay: 0.5,
        })
          // Animate highlight cards
          .to(
            ".highlight-card",
            {
              opacity: 1,
              y: 0,
              scale: 1,
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

        // GSAP hover animations for highlight cards - Ultra smooth like about page stats
        const highlightCards = document.querySelectorAll(".highlight-card")
        highlightCards.forEach((card) => {
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

        {/* Enhanced geometric shapes with glow - Education themed icons */}
        <div className="floating-element floating-2 absolute top-1/3 left-20 p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
          <GraduationCap className="w-8 h-8 text-blue-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute top-1/2 right-32 p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
          <BookOpen className="w-10 h-10 text-purple-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute bottom-1/3 left-1/3 p-2 bg-green-500/10 rounded-lg backdrop-blur-sm">
          <Award className="w-6 h-6 text-green-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/4 right-1/4 p-2 bg-yellow-500/10 rounded-lg backdrop-blur-sm">
          <Trophy className="w-7 h-7 text-yellow-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/4 left-1/5 p-2 bg-indigo-500/10 rounded-lg backdrop-blur-sm">
          <Star className="w-6 h-6 text-indigo-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-3/4 right-1/5 p-3 bg-teal-500/10 rounded-lg backdrop-blur-sm">
          <Target className="w-8 h-8 text-teal-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-2 absolute top-1/6 left-1/2 p-2 bg-pink-500/10 rounded-lg backdrop-blur-sm">
          <Lightbulb className="w-6 h-6 text-pink-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-3 absolute bottom-1/6 right-1/3 p-2 bg-cyan-500/10 rounded-lg backdrop-blur-sm">
          <Brain className="w-7 h-7 text-cyan-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element floating-1 absolute top-2/3 left-1/6 p-2 bg-amber-500/10 rounded-lg backdrop-blur-sm">
          <Medal className="w-6 h-6 text-amber-400/60 drop-shadow-lg" />
        </div>
      </div>

      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <Header title="Education" subtitle="My academic journey and achievements" />

          {/* Main Education Timeline */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

              {/* BSc Education */}
              <div className="education-card md:flex items-center mb-12 relative">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-500/20 bg-gradient-to-r from-blue-900/10 to-blue-800/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 to-blue-500/80 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-end mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-100">B.Sc. in CSE</h3>
                          <p className="text-slate-300">Varendra University Rajshahi</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-900/60 rounded-lg flex items-center justify-center ml-4">
                          <GraduationCap className="h-6 w-6 text-blue-400" />
                        </div>
                      </div>
                      <div className="bg-slate-900/40 px-4 py-2 rounded-md mb-4 inline-block">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                          <p className="text-sm font-medium text-blue-400">2022 - Present</p>
                        </div>
                      </div>
                      <p className="text-base text-slate-200 leading-relaxed">
                        Currently pursuing Bachelor of Science in Computer Science and Engineering, focusing on software
                        development, algorithms, and system design.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 hidden md:block">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-slate-900"></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              {/* HSC Education */}
              <div className="education-card md:flex items-center mb-12 relative">
                <div className="md:w-1/2 md:pr-12 md:text-right"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 hidden md:block">
                  <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-slate-900"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-green-500/20 bg-gradient-to-r from-green-900/10 to-green-800/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/80 to-green-500/80 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-900/60 rounded-lg flex items-center justify-center mr-4">
                          <BookOpen className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-100">HSC</h3>
                          <p className="text-slate-300">Rajshahi Govt. School & College</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-slate-900/40 px-4 py-2 rounded-md inline-block">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-green-400 mr-2" />
                            <p className="text-sm font-medium text-green-400">2021</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-900/70 text-green-200 text-sm font-medium">
                          GPA: 4.92/5.00
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">Science Group - Rajshahi Board</p>
                      <p className="text-base text-slate-200 leading-relaxed">
                        Completed Higher Secondary Certificate with excellent results in Science group, building a
                        strong foundation in mathematics and physics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SSC Education */}
              <div className="education-card md:flex items-center mb-12 relative">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20 bg-gradient-to-r from-purple-900/10 to-purple-800/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/80 to-purple-500/80 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-end mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-100">SSC</h3>
                          <p className="text-slate-300">Rajshahi University School & College</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-900/60 rounded-lg flex items-center justify-center ml-4">
                          <BookOpen className="h-6 w-6 text-purple-400" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-purple-900/70 text-purple-200 text-sm font-medium">
                          GPA: 5.00/5.00
                        </Badge>
                        <div className="bg-slate-900/40 px-4 py-2 rounded-md inline-block">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-purple-400 mr-2" />
                            <p className="text-sm font-medium text-purple-400">2019</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">Science Group - Rajshahi Board</p>
                      <p className="text-base text-slate-200 leading-relaxed">
                        Achieved perfect GPA in Secondary School Certificate, demonstrating consistent academic
                        excellence and dedication to learning.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 hidden md:block">
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-4 border-slate-900"></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              {/* JSC Education */}
              <div className="education-card md:flex items-center relative">
                <div className="md:w-1/2 md:pr-12 md:text-right"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 hidden md:block">
                  <div className="w-6 h-6 rounded-full bg-orange-500 border-4 border-slate-900"></div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-500/20 bg-gradient-to-r from-orange-900/10 to-orange-800/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/80 to-orange-500/80 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-orange-900/60 rounded-lg flex items-center justify-center mr-4">
                          <BookOpen className="h-6 w-6 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-100">JSC</h3>
                          <p className="text-slate-300">Rajshahi University School & College</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-slate-900/40 px-4 py-2 rounded-md inline-block">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-orange-400 mr-2" />
                            <p className="text-sm font-medium text-orange-400">2017</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-orange-900/70 text-orange-200 text-sm font-medium">
                          GPA: 5.00/5.00
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">Rajshahi Board</p>
                      <p className="text-base text-slate-200 leading-relaxed">
                        Started academic journey with perfect results in Junior School Certificate, establishing a
                        pattern of academic excellence from early education.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Highlights */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 mb-10 text-center">Academic Highlights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="highlight-card bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-500/20 bg-gradient-to-r from-blue-900/10 to-blue-800/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 to-blue-500/80 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 bg-blue-900/60 rounded-full flex items-center justify-center mr-3">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100">Key Subjects</h3>
                  </div>
                  <ul className="space-y-2 text-slate-200 text-base">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Data Structures and Algorithms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Database Management Systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Computer Networks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Software Engineering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Web Development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>System Administration</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="highlight-card bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-green-500/20 bg-gradient-to-r from-green-900/10 to-green-800/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/80 to-green-500/80 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 bg-green-900/60 rounded-full flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100">Achievements</h3>
                  </div>
                  <ul className="space-y-2 text-slate-200 text-base">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Consistent academic excellence</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Perfect GPA in SSC and JSC</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Strong foundation in STEM subjects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Active participation in tech projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Practical application of theoretical knowledge</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
