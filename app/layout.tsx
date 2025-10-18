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
        <head>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Levi’s Graduation Party 🎓"/>
            <meta property="og:image" content="https://grad.codekxlabs.com/uploads/squares.png"/>
            <meta property="og:description" content="Join me in celebrating this special milestone! Click to RSVP."/>
            <meta property="og:url" content="https://grad.codekxlabs.com/"/>
            <meta property="og:site_name" content="Levi’s Graduation Party 🎓"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image:width" content="1200"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Levi’s Graduation Party 🎓"/>
            <meta name="twitter:description" content="Join me in celebrating this special milestone! Click to RSVP."/>
            <meta name="twitter:image" content="https://grad.codekxlabs.com/uploads/squares.png"/>
            <meta name="twitter:site" content="@codekxlabs"/>
            <meta name="twitter:creator" content="@codekxlabs"/>
            <meta name="twitter:url" content="https://grad.codekxlabs.com/"/>
        </head>
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
