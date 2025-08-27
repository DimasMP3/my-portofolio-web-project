"use client"

import type React from "react"
import { useEffect, useState, useMemo, useRef } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, User, MessageCircle } from "lucide-react"

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
)
const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const Button = ({ children, className, variant = "default", size = "default", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline"; size?: "default" | "sm" | "icon" }) => {
  const baseClasses = "font-semibold rounded-lg flex items-center justify-center transition-colors"
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
  }
  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    icon: "p-2"
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
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
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
        <ContactSection />
    </div>
  )
}


interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  isAdmin: boolean;
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [currentUserEmail, setCurrentUserEmail] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const typingTexts = useMemo(() => ["Contact Me", "Let's Connect", "Get In Touch", "Start a Project"], [])

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load existing messages for user
  const loadMessages = async (email: string) => {
    try {
      const response = await fetch(`/api/contact?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })))
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

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

  // Handle starting chat (name and email submission)
  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setChatStarted(true)
      setCurrentUserEmail(formData.email)
      loadMessages(formData.email)
    }
  }

  // Handle sending message in chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.message.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_message',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Add user message immediately
        setMessages(prev => [...prev, {
          ...data.userMessage,
          timestamp: new Date(data.userMessage.timestamp)
        }])
        
        // Clear message field
        setFormData(prev => ({ ...prev, message: '' }))
      } else {
        console.error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetChat = () => {
    setChatStarted(false)
    setMessages([])
    setFormData({ name: "", email: "", message: "" })
    setCurrentUserEmail("")
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

      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
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

        {/* Chat Interface */}
        <Card className="border-gray-200/50 hover:border-blue-500/20 transition-colors">
          <CardContent className="p-6 lg:p-8">
            {!chatStarted ? (
              // Initial contact form
              <>
                <h2 className="text-2xl lg:text-3xl font-semibold mb-6">Start Conversation</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Enter your details to send me a message
                </p>
                <form onSubmit={handleStartChat} className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
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
                  <Button type="submit" className="w-full h-12 text-base hover:scale-[1.02] transition-transform">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Messaging
                  </Button>
                </form>
              </>
            ) : (
              // Chat interface
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-semibold">Messages</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.name} • {formData.email}
                    </p>
                  </div>
                  <Button
                    onClick={resetChat}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    New Message
                  </Button>
                </div>

                {/* Messages container */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
                  <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                          <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No messages yet. Send your first message!</p>
                        </div>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 items-start ${
                            message.isAdmin ? "justify-start" : "justify-end"
                          }`}
                        >
                          {message.isAdmin && (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-semibold">DM</span>
                            </div>
                          )}

                          <div className="flex flex-col max-w-[80%]">
                            <div
                              className={`px-4 py-3 rounded-lg text-sm ${
                                message.isAdmin
                                  ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                  : "bg-blue-600 text-white"
                              }`}
                            >
                              <p className="leading-relaxed break-words">{message.message}</p>
                            </div>
                            <p
                              className={`text-xs mt-1 px-2 text-gray-500 dark:text-gray-400 ${
                                message.isAdmin ? "text-left" : "text-right"
                              }`}
                            >
                              {message.isAdmin ? "Dimas" : "You"} •{" "}
                              {message.timestamp.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>

                          {!message.isAdmin && (
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message input */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <Input
                        name="message"
                        placeholder="Type your message..."
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage(e)
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !formData.message.trim()}
                        className="px-4"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
