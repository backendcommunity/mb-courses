import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { KapAIAssistant } from "@/components/kap-ai-assistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MasteringBackend - Learn Backend Development",
  description: "Master backend development with comprehensive courses, projects, and hands-on learning paths.",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="masteringbackend-theme"
        >
          {children}
          <KapAIAssistant />
        </ThemeProvider>
      </body>
    </html>
  )
}
