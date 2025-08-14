import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import MiniAppReady from "../components/MiniAppReady"

const PROD = "https://dare-me-eight.vercel.app"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const miniappEmbed = {
  version: "1",
  imageUrl: `${PROD}/og.png`,
  button: {
    title: "Open Polls",
    action: {
      type: "launch_miniapp",
      name: "Polls",
      url: PROD,
      splashImageUrl: `${PROD}/splash-200.png`,
      splashBackgroundColor: "#0f0f23",
    },
  },
}

export const metadata: Metadata = {
  title: "Polls Mini App",
  description: "Create and vote on polls",
  other: {
    "fc:miniapp": JSON.stringify(miniappEmbed),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-dvh bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
        <MiniAppReady />
        {children}
      </body>
    </html>
  )
}
