import { notFound } from "next/navigation"
import { getInviteeByToken } from "@/lib/db/queries"
import { getEventById } from "@/lib/db/queries"
import { InvitationView } from "@/components/invitation-view"

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

  return <InvitationView invitee={invitee} event={event} />
}
