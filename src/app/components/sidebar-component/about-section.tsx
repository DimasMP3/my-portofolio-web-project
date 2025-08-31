"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { MapPin, Calendar, GraduationCap, Code, Heart, Zap, Star, Sparkles, Trophy, Target } from "lucide-react"
import { useState, useEffect } from "react"

export function AboutSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const roles = ["Web Developer", "Vibe Coder", "Full Stack Developer", "AI Engineer", "Prompter Engineer"]
    const currentRole = roles[currentRoleIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false)
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      } else {
        setDisplayedText((prev) => (isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentRoleIndex])

  const quickInfo = [
    { icon: MapPin, label: "Location", value: "Indonesia", color: "text-green-500" },
    { icon: GraduationCap, label: "University", value: "BSI University", color: "text-blue-500" },
    { icon: Calendar, label: "Status", value: "Available for work", color: "text-purple-500" },
    { icon: Code, label: "Experience", value: "Student", color: "text-orange-500" },
  ]

  const interests = [
    { name: "Web Development", icon: Code, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
    { name: "UI/UX Design", icon: Heart, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
    { name: "Mobile Development", icon: Zap, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
    { name: "Database Design", icon: Target, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
    { name: "Cloud Computing", icon: Star, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
    { name: "Open Source", icon: Trophy, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
    { name: "Machine Learning", icon: Sparkles, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
    { name: "DevOps", icon: Code, color: "bg-slate-700/30 text-slate-300 border-slate-600/50" },
  ]

  return (
    <div className="space-y-8 animate-fade-in-up relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-10 right-20 h-6 w-6 text-primary/20 animate-pulse" />
        <Star
          className="absolute top-60 right-10 h-4 w-4 text-blue-400/30 animate-bounce-gentle"
          style={{ animationDelay: "1s" }}
        />
        <Trophy
          className="absolute bottom-40 left-10 h-5 w-5 text-yellow-400/20 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Hello, I&apos;m Dimas Maulana Putra</h1>
        <div className="text-lg md:text-xl text-muted-foreground mb-6 h-8 flex items-center">
          <span className="font-mono">
            {displayedText}
            <span className="animate-pulse text-primary">|</span>
          </span>
          <span className="ml-2 text-sm opacity-60">& Informatic Engineering Student</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <Card
                key={info.label}
                className={`animate-scale-in animate-delay-${(index + 1) * 100} hover-lift hover-glow border-primary/20 hover:border-primary/40 transition-all duration-300`}
              >
                <CardContent className="p-4 text-center">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${info.color} animate-bounce-gentle`} />
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-medium">{info.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="animate-scale-in animate-delay-200 hover-lift border-primary/20 hover:border-primary/40 transition-all duration-500 bg-card relative overflow-hidden">
        <CardContent className="p-6 md:p-8 relative">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <Code className="h-6 w-6 text-primary" />
            About Me
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base">
              I&apos;m a passionate web developer currently pursuing my degree in Informatic Engineering at Bina Sarana
              Informatika University. I love creating modern, responsive web applications using cutting-edge
              technologies.
            </p>
            <p className="text-base">
              My journey in web development started with curiosity about how websites work, and it has evolved into a
              passion for creating user-friendly, efficient, and beautiful digital experiences. I specialize in
              full-stack development with a focus on React ecosystem and modern JavaScript frameworks.
            </p>
            <p className="text-base">
              I&apos;m always eager to learn new technologies and take on challenging projects that push my skills to the
              next level. Currently exploring advanced topics in cloud computing, microservices architecture, and AI
              integration.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-scale-in animate-delay-300 hover-lift border-border hover:border-primary/40 transition-all duration-500 bg-card">
          <CardContent className="p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
              <GraduationCap className="h-5 w-5 text-blue-500" />
              Education
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary/30 pl-4 hover:border-primary/60 transition-colors duration-300">
                <h3 className="text-xl font-medium text-foreground">Informatic Engineering</h3>
                <p className="text-primary font-medium">Bina Sarana Informatika University</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  2023 - Present
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Focus on software engineering, database systems, and web technologies
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animate-delay-400 hover-lift border-border hover:border-primary/40 transition-all duration-500 bg-card">
          <CardContent className="p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-1 h-5 bg-green-500 rounded-full"></div>
              <Heart className="h-5 w-5 text-green-500" />
              Interests & Hobbies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 auto-rows-fr">
              {interests.map((interest, index) => {
                const Icon = interest.icon
                return (
                  <Badge
                    key={interest.name}
                    variant="outline"
                    className={`text-sm transition-all duration-300 cursor-pointer animate-scale-in animate-delay-${(index + 1) * 100} hover:scale-105 shadow-lg hover:shadow-xl border ${interest.color} group flex items-center justify-start py-3 px-4 h-12 w-full`}
                  >
                    <Icon className="h-4 w-4 mr-3 group-hover:animate-bounce flex-shrink-0" />
                    <span className="text-left whitespace-nowrap overflow-hidden text-ellipsis">{interest.name}</span>
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
