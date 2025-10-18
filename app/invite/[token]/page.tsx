import { notFound } from "next/navigation"
import {getInviteeByToken, getRsvpByInviteeId} from "@/lib/db/queries"
import { getEventById } from "@/lib/db/queries"
import { InvitationView } from "@/components/invitation-view"

import { Metadata } from "next"

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
    const invitee = await getInviteeByToken(params.id) // fetch invitee if you have API
    const name = invitee?.name || "My Graduation Party 🎓"

    return {
        title: `${name} — Levi’s Graduation Party 🎓`,
        description: "Join me in celebrating this special milestone! Click to RSVP.",
        openGraph: {
            title: `${name} — Levi’s Graduation Party 🎓`,
            description: "Join me in celebrating this special milestone! Click to RSVP.",
            url: `https://grad.codekxlabs.com/invite/${params.id}`,
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
            title: "Levi’s Graduation Party 🎓",
            description: "Join me in celebrating this special milestone! Click to RSVP.",
            images: ["https://grad.codekxlabs.com/uploads/squares.png"],
        },
    }
}

interface InvitePageProps {
  params: Promise<{
    token: string
  }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params

  // Fetch invitee by token
  const invitee = await getInviteeByToken(token)

  if (!invitee) {
    notFound()
  }

  // Fetch event details
  const event = await getEventById(invitee.eventId)

  if (!event) {
    notFound()
  }

  const rsvp = await getRsvpByInviteeId(invitee.id)

  return <InvitationView invitee={invitee} event={event} rsvp={rsvp}/>
}
