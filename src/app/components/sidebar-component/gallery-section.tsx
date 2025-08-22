"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Camera, Heart, X, GripVertical } from "lucide-react"
import Image from "next/image"

interface Photo {
  id: number
  title: string
  description: string
  location: string
  date: string
  category: string
  image: string
  likes: number
  position: { x: number; y: number }
}

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const [photos, setPhotos] = useState([
    {
      id: 1,
      title: "Coding Session",
      description: "Late night coding session working on my latest project",
      location: "Home Office",
      date: "2024-01-15",
      category: "work",
      image: "/night-coding-setup.png",
      likes: 24,
      position: { x: 0, y: 0 },
    },
    {
      id: 2,
      title: "University Campus",
      description: "Beautiful morning at BSI University campus",
      location: "BSI University",
      date: "2024-01-10",
      category: "education",
      image: "/modern-university-campus.png",
      likes: 18,
      position: { x: 0, y: 0 },
    },
    {
      id: 3,
      title: "Team Project",
      description: "Working with my team on final year project",
      location: "Computer Lab",
      date: "2024-01-08",
      category: "education",
      image: "/image/gallery/gallery1.png",
      likes: 32,
      position: { x: 0, y: 0 },
    },
    {
      id: 4,
      title: "Coffee & Code",
      description: "Perfect combination for productive coding",
      location: "Local Cafe",
      date: "2024-01-05",
      category: "lifestyle",
      image: "/cafe-laptop-coffee.png",
      likes: 45,
      position: { x: 0, y: 0 },
    },
    {
      id: 5,
      title: "Graduation Day",
      description: "Celebrating my achievement in Informatic Engineering",
      location: "BSI University",
      date: "2023-12-20",
      category: "milestone",
      image: "/gallery-graduation.png",
      likes: 67,
      position: { x: 0, y: 0 },
    },
    {
      id: 6,
      title: "Hackathon Win",
      description: "First place at local hackathon competition",
      location: "Tech Hub Jakarta",
      date: "2023-11-15",
      category: "achievement",
      image: "/hackathon-trophy-team.png",
      likes: 89,
      position: { x: 0, y: 0 },
    },
    {
      id: 7,
      title: "Weekend Hiking",
      description: "Refreshing weekend hike to clear my mind",
      location: "Bogor Mountains",
      date: "2023-10-28",
      category: "lifestyle",
      image: "/mountain-hiker.png",
      likes: 41,
      position: { x: 0, y: 0 },
    },
    {
      id: 8,
      title: "New Setup",
      description: "Finally completed my dream coding setup",
      location: "Home Office",
      date: "2023-10-15",
      category: "work",
      image: "/placeholder-t246y.png",
      likes: 56,
      position: { x: 0, y: 0 },
    },
  ])

  const getCardDimensions = useCallback(() => {
    return { width: 300, height: 300 }
  }, [])

  const getInitialPositions = useCallback(() => {
    const { width: cardWidth, height: cardHeight } = getCardDimensions()
    const gap = 24
    const positions = []
    const cols = 5 // Fixed 5 columns for horizontal scrolling

    for (let i = 0; i < photos.length; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      positions.push({
        x: col * (cardWidth + gap) + gap,
        y: row * (cardHeight + gap) + gap,
      })
    }

    return positions
  }, [photos.length, getCardDimensions])

  useEffect(() => {
    const initialPositions = getInitialPositions()
    setPhotos((prev) =>
      prev.map((photo, index) => ({
        ...photo,
        position: initialPositions[index] || { x: 0, y: 0 },
      })),
    )
  }, [getInitialPositions])

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

        setPhotos((prev) =>
          prev.map((photo) => (photo.id === id ? { ...photo, position: { x: newX, y: newY } } : photo)),
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

  // Typing animation text variations
  const textVariations = [
    "My Life in Pictures",
    "Capturing Memories",
    "Visual Journey",
    "Photo Stories",
    "Life Through Lens"
  ]

  useEffect(() => {
    const currentText = textVariations[currentTextIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % textVariations.length)
      } else {
        setDisplayedText((prev) => (isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1)))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentTextIndex, textVariations])

  const getContainerDimensions = useCallback(() => {
    const { width: cardWidth, height: cardHeight } = getCardDimensions()
    const gap = 24
    const cols = 5
    const rows = Math.ceil(photos.length / cols)

    return {
      width: cols * (cardWidth + gap) + gap,
      height: rows * (cardHeight + gap) + gap + 100, // Extra space for dragging
    }
  }, [photos.length, getCardDimensions])

  const categories = [
    { id: "all", label: "All Photos", count: photos.length },
    { id: "work", label: "Work", count: photos.filter((p) => p.category === "work").length },
    { id: "education", label: "Education", count: photos.filter((p) => p.category === "education").length },
    { id: "lifestyle", label: "Lifestyle", count: photos.filter((p) => p.category === "lifestyle").length },
    { id: "milestone", label: "Milestones", count: photos.filter((p) => p.category === "milestone").length },
    { id: "achievement", label: "Achievements", count: photos.filter((p) => p.category === "achievement").length },
  ]

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
          <Camera className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">Life Gallery</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          <span className="font-mono">
            {displayedText}
            <span className="animate-pulse text-blue-400">|</span>
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A collection of moments that define my journey as a developer and student
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {category.label}
            <Badge variant="secondary" className="ml-2 bg-slate-700 text-slate-300">
              {category.count}
            </Badge>
          </Button>
        ))}
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
          {filteredPhotos.map((photo, index) => {
            const { width: cardWidth, height: cardHeight } = getCardDimensions()

            return (
              <Card
                key={photo.id}
                ref={(el) => {
                  cardRefs.current[photo.id] = el
                }}
                className={`
                  animate-scale-in animate-delay-${(index + 1) * 100} 
                  transition-all duration-200 ease-out
                  border-border/50 cursor-move bg-transparent backdrop-blur-sm
                  flex flex-col absolute overflow-hidden
                  ${
                    draggedItem === photo.id
                      ? "scale-110 rotate-2 shadow-2xl shadow-primary/20 border-primary/30 z-50 brightness-110"
                      : hoveredItem === photo.id
                        ? "scale-105 shadow-xl shadow-primary/10 border-primary/20 z-20"
                        : "hover:scale-102 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/10 z-10"
                  }
                `}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translate(${photo.position.x}px, ${photo.position.y}px)`,
                  transition: draggedItem === photo.id ? "none" : "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseDown={(e) => handleMouseDown(e, photo.id)}
                onMouseEnter={() => !isDragging && setHoveredItem(photo.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => !isDragging && setSelectedPhoto(photo)}
              >
                <CardContent className="p-0 h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      className="object-cover transition-all duration-300"
                    />

                    {/* Drag handle */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-grab active:cursor-grabbing">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/20">
                        <GripVertical className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] max-h-[70vh]">
              <Image
                src={selectedPhoto.image || "/placeholder.svg"}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Minimal info bar */}
            <div className="p-4 flex items-center justify-between bg-slate-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 capitalize">
                  {selectedPhoto.category}
                </Badge>
                <span className="text-slate-400 text-sm">{new Date(selectedPhoto.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <Heart className="h-4 w-4 fill-current" />
                <span className="text-sm">{selectedPhoto.likes}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
