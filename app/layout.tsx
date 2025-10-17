import type React from "react"
import {Suspense} from "react"
import type {Metadata} from "next"
import {GeistSans} from "geist/font/sans"
import {GeistMono} from "geist/font/mono"
import {Playfair_Display} from "next/font/google"
import {Analytics} from "@vercel/analytics/next"
import "./globals.css"
import {LoaderPage} from "./loader"
import {Toaster} from "@/components/ui/sonner";


const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
})

export const metadata: Metadata = {
    title: "Graduation Invitation",
    description: "You are cordially invited to my graduation ceremony",
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <Suspense fallback={<LoaderPage/>}>{children}</Suspense>
        <Analytics/>
        <Toaster/>
        </body>
        </html>
    )
}

interface LoaderPageProps {
    darkMode?: boolean
}
