import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { GraduationCap } from "lucide-react"
import { headers } from "next/headers"
import { LoaderPage } from "./loader"


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Graduation Invitation",
  description: "You are cordially invited to our graduation ceremony",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <Suspense fallback={<LoaderPage />}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
interface LoaderPageProps {
  darkMode?: boolean
}
