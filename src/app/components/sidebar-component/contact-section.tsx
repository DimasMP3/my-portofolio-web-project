"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const typingTexts = ["Contact Me", "Let's Connect", "Get In Touch", "Start a Project"]

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "dimasmaulanaptra@gmail.com",
      href: "mailto:dimasmaulanaptra@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+62 838-9629-7994",
      href: "tel:+6283896297994",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bogor, Indonesia",
      href: "#",
    },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/DimasMP3", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ]

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-mono">
          {displayText}
          <span className="animate-blink-caret">|</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">Let's work together on your next project</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="animate-scale-in animate-delay-200 border-border/50 hover:border-primary/20 transition-colors">
            <CardContent className="p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div
                      key={info.label}
                      className={`flex items-center gap-4 animate-fade-in-up animate-delay-${(index + 3) * 100} group`}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{info.label}</p>
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm font-medium text-foreground mb-4">Follow me on</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="animate-scale-in animate-delay-400 border-border/50 hover:border-primary/20 transition-colors">
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="resize-none"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base hover:scale-[1.02] transition-transform">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
