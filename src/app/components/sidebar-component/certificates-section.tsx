"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, ExternalLink, GripVertical } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export function CertificatesSection() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "PCAP : Programming Essential In Python",
      issuer: "Cisco Networking Academy",
      date: "2024",
      description: "This certification validates your skills in programming with Python.",
      skills: ["Python", "Programming"],
      link: "https://drive.google.com/drive/folders/1scxSf5eUYBgZXtsPfrlUUXp7FYUZ5JM8?usp=sharing",
      image: "/image/sertificates/sertif1.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 2,
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "2025",
      description: "This certification covers the fundamentals of networking, including IP addressing and network protocols.",
      skills: ["Cisco", "Networking"],
      link: "https://drive.google.com/file/d/1I13tbbbGwb7446z7cRuRTektRiswrS8Q/view?usp=sharing",
      image: "/image/sertificates/sertif2.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 3,
      title: "Guide to Learn Python with AI at DQLab",
      issuer: "DQLab",
      date: "2023",
      description: "This course provides a comprehensive introduction to Python programming with a focus on AI applications.",
      skills: ["Python", "AI", "Machine Learning"],
      link: "https://drive.google.com/drive/folders/1Bet45s055afECK3UNMQ-q6PQ6_Rq0VVi?usp=sharing",
      image: "/image/sertificates/sertif3.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 4,
      title: "Build a Property Listing Application REST API",
      issuer: "eduwork",
      date: "2024",
      description: "This certification validates your skills in building RESTful APIs using modern web technologies.",
      skills: ["REST API"],
      link: "https://drive.google.com/file/d/1KA3SiHMRUmim2ewGHQbAjKTFTBLkuPTB/view?usp=sharing",
      image: "/image/sertificates/sertif4.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 5,
      title: "Programming Untuk Pengembangan Aplikasi AI",
      issuer: "Bina Sarana Informatika University",
      date: "2024",
      description: "This certification validates my skills in programming for AI application development.",
      skills: ["Programming", "AI"],
      link: "https://drive.google.com/file/d/1yhERskTSz0px_h6UgRAiy1OWDYz18qfW/view?usp=sharing",
      image: "/image/sertificates/sertif5.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 6,
      title: "Profesional Programmer with Golang",
      issuer: "Bina Sarana Informatika University",
      date: "2023",
      description: "Comprehensive Golang certification covering Go syntax, concurrency, and web development.",
      skills: ["Golang", "Programming", "Web Development"],
      link: "https://drive.google.com/file/d/128sxD3kz1WTkb9HfCLGAt5czjC-TzCID/view?usp=sharing",
      image: "/image/sertificates/sertif6.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 7,
      title: "Code Generations and Optimization",
      issuer: "HACKTIV8",
      date: "2025",
      description: "Advanced techniques in code generation, optimization strategies, and performance tuning.",
      skills: ["Vibe Coding", "AI"],
      link: "#",
      image: "/image/sertificates/sertif7.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 8,
      title: "Database Design & Management",
      issuer: "Oracle",
      date: "2022",
      description: "Database design principles, SQL optimization, and database management systems.",
      skills: ["SQL", "Database Design", "MySQL", "PostgreSQL"],
      link: "#",
      image: "/image/sertif1.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 9,
      title: "Cloud Computing Fundamentals",
      issuer: "AWS",
      date: "2024",
      description: "Cloud infrastructure, deployment strategies, and AWS services fundamentals.",
      skills: ["AWS", "Cloud Computing", "EC2", "S3"],
      link: "#",
      image: "/image/sertif1.png",
      position: { x: 0, y: 0 },
    },
    {
      id: 10,
      title: "UI/UX Design Principles",
      issuer: "Google",
      date: "2023",
      description: "User interface and user experience design fundamentals and best practices.",
      skills: ["UI Design", "UX Design", "Figma", "Prototyping"],
      link: "#",
      image: "/image/sertif1.png",
      position: { x: 0, y: 0 },
    },
  ])

  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const getCardDimensions = useCallback(() => {
    return { width: 320, height: 440 }
  }, [])

  const getInitialPositions = useCallback(() => {
    const { width: cardWidth, height: cardHeight } = getCardDimensions()
    const gap = 24
    const positions = []
    const cols = 5 // Fixed 5 columns for horizontal scrolling

    for (let i = 0; i < certificates.length; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      positions.push({
        x: col * (cardWidth + gap) + gap,
        y: row * (cardHeight + gap) + gap,
      })
    }

    return positions
  }, [certificates.length, getCardDimensions])

  useEffect(() => {
    const initialPositions = getInitialPositions()
    setCertificates((prev) =>
      prev.map((cert, index) => ({
        ...cert,
        position: initialPositions[index] || { x: 0, y: 0 },
      })),
    )
  }, [getInitialPositions])

  useEffect(() => {
    const currentText = certificates[currentIndex].title
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
            setCurrentIndex((prev) => (prev + 1) % certificates.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, certificates])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, id: number) => {
      e.preventDefault()
      const target = e.target as HTMLElement
      if (target.closest("a") || target.closest("button")) return

      const cardElement = cardRefs.current[id]
      if (!cardElement) return

      const rect = cardElement.getBoundingClientRect()
      const container = containerRef.current?.getBoundingClientRect()
      if (!container) return

      setDraggedItem(id)
      setIsDragging(true)
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top })

      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return
        const containerRect = containerRef.current.getBoundingClientRect()
        const { width: cardWidth, height: cardHeight } = getCardDimensions()

        const scrollWidth = containerRef.current.scrollWidth
        const maxX = Math.max(0, scrollWidth - cardWidth - 24)
        const maxY = Math.max(0, containerRect.height - cardHeight - 24)
        const newX = Math.max(
          24,
          Math.min(e.clientX - containerRect.left - dragOffset.x + containerRef.current.scrollLeft, maxX),
        )
        const newY = Math.max(24, Math.min(e.clientY - containerRect.top - dragOffset.y, maxY))

        setCertificates((prev) =>
          prev.map((cert) => (cert.id === id ? { ...cert, position: { x: newX, y: newY } } : cert)),
        )
      }

      const handleGlobalMouseUp = () => {
        setDraggedItem(null)
        setIsDragging(false)
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    },
    [dragOffset, getCardDimensions],
  )

  const getContainerDimensions = useCallback(() => {
    const { width: cardWidth, height: cardHeight } = getCardDimensions()
    const gap = 24
    const cols = 5
    const rows = Math.ceil(certificates.length / cols)

    return {
      width: cols * (cardWidth + gap) + gap,
      height: rows * (cardHeight + gap) + gap + 100, // Extra space for dragging
    }
  }, [certificates.length, getCardDimensions])

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-mono">
          {displayText}
          <span className="animate-blink-caret">|</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
          Professional certifications and achievements
        </p>
      </div>

      <div
        ref={containerRef}
        className={`relative w-full overflow-x-auto overflow-y-hidden ${isDragging ? "select-none" : ""} 
                   scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500`}
        style={{
          userSelect: isDragging ? "none" : "auto",
          height: `${getContainerDimensions().height}px`,
        }}
      >
        <div
          className="relative"
          style={{
            width: `${getContainerDimensions().width}px`,
            height: `${getContainerDimensions().height}px`,
          }}
        >
          {certificates.map((cert, index) => {
            const { width: cardWidth, height: cardHeight } = getCardDimensions()

            return (
              <Card
                key={cert.id}
                ref={(el) => {
                  cardRefs.current[cert.id] = el
                }}
                className={`
                  animate-scale-in animate-delay-${(index + 1) * 100} 
                  transition-all duration-200 ease-out
                  border-border/50 cursor-move bg-card/95 backdrop-blur-sm
                  flex flex-col absolute
                  ${
                    draggedItem === cert.id
                      ? "scale-110 rotate-2 shadow-2xl shadow-primary/20 border-primary/30 z-50 brightness-110"
                      : hoveredItem === cert.id
                        ? "scale-105 shadow-xl shadow-primary/10 border-primary/20 z-20"
                        : "hover:scale-102 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/10 z-10"
                  }
                `}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translate(${cert.position.x}px, ${cert.position.y}px)`,
                  transition: draggedItem === cert.id ? "none" : "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseDown={(e) => handleMouseDown(e, cert.id)}
                onMouseEnter={() => !isDragging && setHoveredItem(cert.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative w-full h-48 flex-shrink-0 bg-muted/20 rounded-t-lg overflow-hidden">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={`Certificate ${cert.title}`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="320px"
                    priority={index < 4}
                    className="transition-transform duration-300 hover:scale-105 p-2"
                  />
                </div>

                <CardContent className="p-4 flex flex-col flex-grow justify-between">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-grow space-y-1 min-w-0">
                      <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-primary font-medium truncate">{cert.issuer}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="p-1 h-auto flex-shrink-0 ml-2">
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{cert.description}</p>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{cert.date}</span>
                    </div>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move flex-shrink-0" />
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-border/20">
                    {cert.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs px-1.5 py-0.5 truncate">
                        {skill}
                      </Badge>
                    ))}
                    {cert.skills.length > 2 && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        +{cert.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
