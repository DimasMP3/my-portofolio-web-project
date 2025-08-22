"use client"

import type React from "react"
import { useEffect, useState, useMemo } from "react"
// Asumsikan komponen ini ada di path yang benar
// import { Card, CardContent } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Textarea } from "@/app/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react"

// --- Mock Components for Demonstration ---
// Komponen-komponen ini adalah pengganti sementara agar kode bisa berjalan.
// Ganti dengan impor asli Anda.
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
)
const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center transition-colors hover:bg-blue-700 ${className}`}
    {...props}
  >
    {children}
  </button>
)
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
    {...props}
  />
)
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
    {...props}
  ></textarea>
)
// --- End of Mock Components ---


// Data konstan dipindahkan ke luar komponen untuk mencegah pembuatan ulang pada setiap render.
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

export default function App() {
  // Menambahkan latar belakang gelap untuk pratinjau yang lebih baik
  // PERBAIKAN UI: Menyesuaikan padding agar lebih granular di berbagai ukuran layar.
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
        <ContactSection />
    </div>
  )
}


export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const typingTexts = useMemo(() => ["Contact Me", "Let's Connect", "Get In Touch", "Start a Project"], [])

  useEffect(() => {
    const handleTyping = () => {
      const currentText = typingTexts[textIndex]
      if (isDeleting) {
        setDisplayText((prev) => prev.substring(0, prev.length - 1))
      } else {
        setDisplayText((prev) => currentText.substring(0, prev.length + 1))
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % typingTexts.length)
      }
    }

    const typingSpeed = isDeleting ? 50 : 100
    const timeout = setTimeout(handleTyping, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, typingTexts])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let's work together on your next project
        </p>
      </div>

      {/* PERBAIKAN UI RESPONSIVE:
        1. Mengganti `lg:grid-cols-2` menjadi `md:grid-cols-2`.
           Ini membuat layout menjadi 2 kolom lebih awal, yaitu di layar berukuran tablet (mulai dari 768px),
           sehingga terlihat lebih seimbang dan tidak terlalu kosong.
        2. Mengubah `gap-8` menjadi `gap-6 md:gap-8`.
           Ini memberikan jarak yang sedikit lebih kecil di layar mobile dan jarak yang lebih besar di layar yang lebih lebar.
      */}
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {/* Kolom Informasi Kontak */}
        <div className="space-y-6">
          <Card className="border-gray-200/50 hover:border-blue-500/20 transition-colors h-full">
            <CardContent className="p-6 lg:p-8 flex flex-col h-full">
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold mb-6">Get in Touch</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                  want to say hi, feel free to reach out!
                </p>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <div
                        key={info.label}
                        className="flex items-center gap-4 group"
                        style={{ animation: `fade-in-up 0.5s ease-out ${200 + index * 100}ms forwards`, opacity: 0 }}
                      >
                        <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors flex-shrink-0">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{info.label}</p>
                          <a
                            href={info.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors text-sm lg:text-base break-all"
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-200/80 dark:border-gray-700/80">
                <p className="text-sm font-medium mb-4">Follow me on</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
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

        {/* Kolom Form Kontak */}
        <Card className="border-gray-200/50 hover:border-blue-500/20 transition-colors">
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
