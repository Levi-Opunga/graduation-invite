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
    title: "Levi’s Graduation Party 🎓",
    description: "Join me in celebrating this special milestone! Click to RSVP.",
    openGraph: {
        title: "Levi’s Graduation Party 🎓",
        description: "Join me in celebrating this special milestone! Click to RSVP.",
        url: "https://grad.codekxlabs.com/",
        siteName: "Levi’s Graduation Party 🎓",
        images: [
            {
                url: "https://grad.codekxlabs.com/uploads/squares.png",
                width: 1200,
                height: 630,
                alt: "Levi’s Graduation Party 🎓",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@codekxlabs",
        creator: "@codekxlabs",
        images: ["https://grad.codekxlabs.com/uploads/squares.png"],
    },
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <html lang="en">
        <head>

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
