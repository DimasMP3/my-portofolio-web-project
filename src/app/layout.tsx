import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Exo_2 } from "next/font/google"
import "./globals.css"
import InteractiveBackground from "@/app/components/interactive-background"
import { Sidebar } from "@/app/components/sidebar-ui/sidebar"
import FloatingChatbot from "@/app/components/chatbotfrontend/floating-chatbot"

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo2",
})

export const metadata: Metadata = {
  title: "Dimas Maulana Putra - Web Developer Portfolio",
  description:
    "Portfolio website of Dimas Maulana Putra, Informatic Engineering student at Bina Sarana Informatika University",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${orbitron.variable} ${exo2.variable} font-sans antialiased bg-gray-900 text-gray-100 relative overflow-x-hidden`}
      >
        <InteractiveBackground />
        
        <div className="min-h-screen bg-gray-900 text-gray-100">
          <Sidebar />
          
          {/* Main Content */}
          <main className="md:ml-64 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
              <div className="max-w-5xl mx-auto animate-fade-in-up relative z-10">
                {children}
              </div>
            </div>
          </main>

          <FloatingChatbot />
        </div>
      </body>
    </html>
  )
}
