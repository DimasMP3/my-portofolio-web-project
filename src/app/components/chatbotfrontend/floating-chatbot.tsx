"use client"
import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Chatbot from "./chatbot"

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white group-hover:animate-bounce" />
            <span className="sr-only">Ask me</span>
          </Button>
        )}

        {/* Floating "Ask me" tooltip */}
        {!isOpen && (
          <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Ask me
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative animate-in slide-in-from-bottom-4 slide-in-from-right-4 duration-300">
            {/* Close Button */}
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Chatbot Component */}
            <div className="transform transition-all duration-300">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
