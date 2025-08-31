"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"
import { Send, Bot, User } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

interface Message {
  id: string
  from: "user" | "bot"
  text: string
  timestamp: Date
}

export default function Chatbot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true)
    setMessages([
      {
        id: "1",
        from: "bot",
        text: "Halo! Saya asisten pribadi Dimas. Ada yang bisa saya bantu?",
        timestamp: new Date(),
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isMounted) {
      scrollToBottom()
    }
  }, [messages, isMounted])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      from: "user",
      text: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: input.trim() }),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        throw new Error("Gagal mengirim pesan")
      }

      const data = await res.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        from: "bot",
        text: data.answer,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        from: "bot",
        text: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto shadow-lg rounded-2xl bg-gray-900 border-gray-700">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto shadow-2xl rounded-2xl border-gray-700 bg-gray-900 font-mono">
      <CardHeader className="bg-gray-800 border-b border-gray-700 p-4">
        <CardTitle className="text-base sm:text-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            <div className="font-semibold text-gray-100 text-sm sm:text-base">Dimas AI Assistant</div>
            <div className="text-xs text-gray-400 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="h-64 sm:h-72 md:h-80 lg:h-96 overflow-y-auto p-4 space-y-4 bg-gray-800">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 items-start ${message.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.from === "bot" && (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-gray-300" />
                </div>
              )}

              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm ${
                    message.from === "user"
                      ? "bg-blue-600 text-white rounded-br-lg"
                      : "bg-gray-700 text-gray-200 rounded-bl-lg"
                  }`}
                >
                  <p className="leading-relaxed break-words">{message.text}</p>
                </div>

                <p
                  className={`text-xs mt-1.5 px-2 text-gray-500 ${message.from === "user" ? "text-right" : "text-left"}`}
                >
                  {message.timestamp.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {message.from === "user" && (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-300" />
              </div>
              <div className="bg-gray-700 rounded-2xl rounded-bl-lg px-4 py-2.5">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-700 p-4 bg-gray-900">
          <div className="flex gap-3 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              disabled={isLoading}
              className="flex-1 rounded-full border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-gray-200 placeholder:text-gray-500 text-sm px-4 py-2"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700 w-10 h-10 flex-shrink-0"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
