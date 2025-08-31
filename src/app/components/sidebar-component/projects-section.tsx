"use client"

import type React from "react"

import { Card } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { ExternalLink, Github, Star, GripVertical, X, Code } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

export function ProjectsSection() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Realtime Activity Tracker",
      description:
        "Web application for managing activities or events, displaying and managing user activity lists.",
      image: "/image/project/projek1.png",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://revou-project-activity-web.vercel.app/",
      githubUrl: "https://github.com/DimasMP3/revou-project-activity-web",
      featured: true,
      status: "Live",
    },
    {
      id: 2,
      title: "Donation Website Panti Asuhan",
      description:
        "This website serves as an information and donation platform to support orphanage activities.",
      image: "/image/project/projek2.png",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Payment Gateway", "Supabase"],
      liveUrl: "https://rumahkasihku.vercel.app/",
      githubUrl: "https://github.com/DimasMP3/rumahkasihku",
      featured: true,
      status: "Live",
    },
    {
      id: 3,
      title: "Portfolio Website Project",
      description:
         "A modern portfolio website showcasing projects and skills with responsive design, clean layout, and interactive elements.",
      image: "/image/project/projek3.png",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://indah-porto.vercel.app/",
      githubUrl: "https://github.com/DimasMP3/project-porto",
      featured: false,
      status: "Live",
    },
    {
      id: 4,
      title: "Arduino Project",
      description:
        "Internet of Things (IoT) dashboard for smart irrigation system monitoring and control.",
      image: "/image/project/projek4.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "MQTT", "Arduino", "C++", "Supabase"],
      liveUrl: "https://github.com/DimasMP3/Sistem-Irigasi-Pintar-Arduino-Project",
      githubUrl: "https://github.com/DimasMP3/Sistem-Irigasi-Pintar-Arduino-Project",
      featured: false,
      status: "Live",
    },
    {
      id: 5,
      title: "Coming Soon",
      description:
        "On Editing ...",
      image: "/modern-blog-platform.png",
      technologies: [],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      status: "Live",
    },
    {
      id: 6,
      title: "Coming Soon",
      description:
        "On Editing ...",
      image: "/modern-chat-app.png",
      technologies: [],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      status: "Live",
    },
  ])

  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const typingTexts = useMemo(() => ["Recent Projects", "Web Applications", "Full-Stack Solutions", "Creative Builds"], [])

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

  const handleDragStart = (e: React.DragEvent, projectId: number) => {
    setDraggedItem(projectId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault()

    if (draggedItem === null || draggedItem === targetId) return

    const newProjects = [...projects]
    const draggedIndex = newProjects.findIndex((p) => p.id === draggedItem)
    const targetIndex = newProjects.findIndex((p) => p.id === targetId)

    const [draggedProject] = newProjects.splice(draggedIndex, 1)
    newProjects.splice(targetIndex, 0, draggedProject)

    setProjects(newProjects)
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div>
        <h1 className="text-5xl font-bold gradient-text mb-4 font-mono">
          {displayText}
          <span className="animate-blink-caret">|</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Some of my recent work and personal projects that showcase my skills
        </p>
      </div>

      {/* Featured Projects */}
      <div>
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
          <Star className="h-8 w-8 text-yellow-500" />
          Featured Projects
        </h2>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.id}
              draggable
              onDragStart={(e) => handleDragStart(e, project.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, project.id)}
              onDragEnd={handleDragEnd}
              onClick={() => handleProjectClick(project)}
              className={`animate-scale-in animate-delay-${(index + 1) * 200} hover-lift group overflow-hidden cursor-pointer aspect-square relative ${
                draggedItem === project.id ? "opacity-50 scale-95" : ""
              } transition-all duration-200 bg-slate-800/50 border-slate-700/50 hover:border-primary/50`}
            >
              <div className="absolute top-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-5 w-5 text-slate-400" />
              </div>

              <div className="absolute inset-0">
                <div className="w-full h-full flex items-start justify-center pt-4">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="max-w-full max-h-[70%] object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-4 right-3 z-20">
                  <Badge
                    variant={project.status === "Live" ? "default" : "secondary"}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/95 via-slate-900/90 to-transparent text-white z-20">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-3 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs bg-slate-800/50 border-slate-600">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-slate-800/50 border-slate-600">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div>
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
          <span className="w-3 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></span>
          Other Projects
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <Card
              key={project.id}
              draggable
              onDragStart={(e) => handleDragStart(e, project.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, project.id)}
              onDragEnd={handleDragEnd}
              onClick={() => handleProjectClick(project)}
              className={`animate-scale-in animate-delay-${(index + 3) * 100} hover-lift group overflow-hidden cursor-pointer aspect-square relative ${
                draggedItem === project.id ? "opacity-50 scale-95" : ""
              } transition-all duration-200 bg-slate-800/50 border-slate-700/50 hover:border-primary/50`}
            >
              <div className="absolute top-2 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-slate-400" />
              </div>

              {/* Image Area - 50% height */}
              <div className="absolute inset-0 h-[50%]">
                <div className="w-full h-full flex items-center justify-center pt-2">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-2 right-2 z-20">
                  <Badge
                    variant={project.status === "Live" ? "default" : "secondary"}
                    className="bg-background/80 backdrop-blur-sm text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Text Area - 55% height */}
              <div className="absolute bottom-0 left-0 right-0 h-[55%] p-3 bg-gradient-to-t from-slate-900 via-slate-900/98 to-slate-900/85 text-white z-20 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-2 text-xs leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs bg-slate-800/50 border-slate-600">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-slate-800/50 border-slate-600">
                        +{project.technologies.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 mt-auto">
                  <Button size="sm" className="flex-1 text-xs py-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs py-1 bg-transparent" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-slate-800/80 hover:bg-slate-700 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              
              <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={selectedProject.status === "Live" ? "default" : "secondary"}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    {selectedProject.status}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string) => (
                      <Badge key={tech} variant="outline" className="bg-slate-800/50 border-slate-600 text-slate-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1" asChild>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
