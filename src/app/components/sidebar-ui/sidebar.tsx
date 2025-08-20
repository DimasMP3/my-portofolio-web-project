"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import {
  User,
  Code,
  Award,
  FolderOpen,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  Sparkles,
  Zap,
  Star,
  Gamepad2,
  Camera,
} from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const activeSection = pathname.split("/")[1] || ""

  const menuItems = [
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "games", label: "Fun Game", icon: Gamepad2 },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/DimasMP3", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dimasmaulanaputra", label: "LinkedIn" },
    { icon: Mail, href: "mailto:dimas@example.com", label: "Email" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-sidebar border border-sidebar-border backdrop-blur-sm hover:scale-110 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border transform transition-all duration-500 ease-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6 relative">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Sparkles className="absolute top-20 right-8 h-4 w-4 text-primary/30 animate-pulse" />
            <Star
              className="absolute top-40 right-12 h-3 w-3 text-blue-400/40 animate-bounce"
              style={{ animationDelay: "1s" }}
            />
            <Zap
              className="absolute bottom-40 right-6 h-3 w-3 text-purple-400/30 animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Profile Section */}
          <div className="text-center mb-8 animate-slide-in-left">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-float">
                <span className="text-2xl font-bold text-white">DM</span>
              </div>
              <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </div>
            <h2 className="text-xl font-bold text-sidebar-foreground bg-gradient-to-r from-white to-blue-200 bg-clip-text">
              Dimas Maulana Putra
            </h2>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Code className="h-3 w-3" />
              Web Developer
            </p>
            <p className="text-xs text-muted-foreground mt-1">Informatic Engineering</p>
            <p className="text-xs text-muted-foreground">BSI University</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 animate-slide-in-left animate-delay-${(index + 1) * 100} group relative overflow-hidden ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-105"
                  } transition-all duration-300`}
                  onClick={() => {
                    router.push(`/${item.id}`)
                    setIsOpen(false)
                  }}
                >
                  <Icon
                    className={`h-4 w-4 transition-all duration-300 ${activeSection === item.id ? "animate-pulse" : "group-hover:scale-110"}`}
                  />
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-sidebar-border">
            <div className="flex justify-center gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Button
                    key={link.label}
                    variant="ghost"
                    size="icon"
                    className={`text-sidebar-foreground hover:text-white hover:bg-gradient-to-br hover:from-primary hover:to-blue-600 animate-scale-in animate-delay-${(index + 1) * 100} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4 group-hover:animate-bounce" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
