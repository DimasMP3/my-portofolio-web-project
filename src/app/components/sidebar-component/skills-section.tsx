"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Code2, Database, Globe, Wrench, Zap, Star, Sparkles, Trophy } from "lucide-react"

export function SkillsSection() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const typingTexts = useMemo(() => ["Technical Skills", "Programming Languages", "Frameworks & Libraries", "Development Tools"], [])

  useEffect(() => {
    const currentText = typingTexts[currentIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % typingTexts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, typingTexts])

  const technicalSkills = [
    { name: "JavaScript", level: 90, color: "from-slate-400 to-slate-500", icon: Code2 },
    { name: "React.js", level: 85, color: "from-slate-400 to-slate-500", icon: Globe },
    { name: "Next.js", level: 80, color: "from-slate-400 to-slate-500", icon: Zap },
    { name: "TypeScript", level: 75, color: "from-slate-400 to-slate-500", icon: Code2 },
    { name: "Node.js", level: 70, color: "from-slate-400 to-slate-500", icon: Database },
    { name: "Python", level: 65, color: "from-slate-400 to-slate-500", icon: Code2 },
    { name: "SQL", level: 75, color: "from-slate-400 to-slate-500", icon: Database },
    { name: "MongoDB", level: 70, color: "from-slate-400 to-slate-500", icon: Database },
  ]

  const techStack = [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vue.js",
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "FastAPI",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "AWS",
    "Vercel",
    "Git",
    "GitHub",
    "VS Code",
    "Figma",
    "Tailwind CSS",
    "Bootstrap",
    "SASS",
    "Webpack",
    "Vite",
    "Jest",
    "Cypress",
    "Postman",
    "Firebase",
    "Supabase",
    "Prisma",
    "GraphQL",
    "REST API",
  ]

  const frameworks = ["React.js", "Next.js", "Vue.js", "Express.js", "FastAPI", "Django"]
  const tools = ["Git", "Docker", "VS Code", "Figma", "Postman", "Vercel", "AWS", "Firebase"]

  return (
    <div className="space-y-8 animate-fade-in-up relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-10 right-20 h-6 w-6 text-slate-400/20 animate-pulse" />
        <Star
          className="absolute top-40 right-10 h-4 w-4 text-slate-400/30 animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <Trophy
          className="absolute bottom-20 left-10 h-5 w-5 text-slate-400/20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative">
        <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center gap-3">
          <Code2 className="h-10 w-10 text-slate-400 animate-pulse" />
          <span className="font-mono">
            {displayText}
            <span className="animate-blink-caret">|</span>
          </span>
        </h1>
        <p className="text-xl text-muted-foreground">Technologies and tools I work with</p>
      </div>

      {/* Enhanced Marquee Sections */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-6 animate-scale-in animate-delay-100 border border-primary/20 hover:border-primary/40 transition-all duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer"></div>
        <div className="flex space-x-8 marquee">
          {techStack.map((tech, index) => (
            <Badge
              key={`marquee-1-${index}`}
              variant="secondary"
              className="whitespace-nowrap text-sm font-medium bg-primary/20 hover:bg-primary/30 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl border border-primary/30"
            >
              <Zap className="h-3 w-3 mr-1 text-slate-400" />
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-l from-secondary/10 via-secondary/5 to-secondary/10 rounded-xl p-6 animate-scale-in animate-delay-200 border border-secondary/20 hover:border-secondary/40 transition-all duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-secondary/5 to-transparent animate-shimmer-reverse"></div>
        <div className="flex space-x-8 marquee-reverse">
          {[...techStack].reverse().map((tech, index) => (
            <Badge
              key={`marquee-2-${index}`}
              variant="outline"
              className="whitespace-nowrap text-sm font-medium border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl bg-background/50 backdrop-blur-sm"
            >
              <Star className="h-3 w-3 mr-1 text-slate-400" />
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Enhanced Technical Skills Card */}
      <Card className="animate-scale-in animate-delay-300 hover-lift border-primary/20 hover:border-primary/40 transition-all duration-500 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <div className="relative">
              <span className="w-3 h-10 bg-slate-400 rounded-full block"></span>
            </div>
            <Code2 className="h-6 w-6 text-slate-400" />
            Technical Skills
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {technicalSkills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.name}
                  className={`space-y-4 animate-fade-in-up animate-delay-${(index + 1) * 100} group`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-slate-400 group-hover:animate-pulse" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono bg-primary/10 px-2 py-1 rounded-md">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-secondary/30 rounded-full h-4 overflow-hidden shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out animate-pulse-glow relative overflow-hidden`}
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Framework and Tools Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-scale-in animate-delay-400 hover-lift border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 bg-gradient-to-br from-background to-blue-50/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <div className="relative">
                <span className="w-3 h-10 bg-slate-400 rounded-full block"></span>
              </div>
              <Globe className="h-6 w-6 text-slate-400" />
              Frameworks & Libraries
            </h2>
            <div className="flex flex-wrap gap-3">
              {frameworks.map((framework, index) => (
                <Badge
                  key={framework}
                  variant="outline"
                  className={`text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer animate-scale-in animate-delay-${(index + 1) * 100} hover:scale-110 shadow-lg hover:shadow-xl border-blue-500/30 hover:border-blue-500`}
                >
                  <Globe className="h-3 w-3 mr-1 text-slate-400" />
                  {framework}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animate-delay-500 hover-lift border-green-500/20 hover:border-green-500/40 transition-all duration-500 bg-gradient-to-br from-background to-green-50/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <div className="relative">
                <span className="w-3 h-10 bg-slate-400 rounded-full block"></span>
              </div>
              <Wrench className="h-6 w-6 text-slate-400" />
              Tools & Platforms
            </h2>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <Badge
                  key={tool}
                  variant="secondary"
                  className={`text-sm hover:bg-green-500 hover:text-white transition-all duration-300 cursor-pointer animate-scale-in animate-delay-${(index + 1) * 100} hover:scale-110 shadow-lg hover:shadow-xl border border-green-500/30 hover:border-green-500`}
                >
                  <Wrench className="h-3 w-3 mr-1 text-slate-400" />
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
