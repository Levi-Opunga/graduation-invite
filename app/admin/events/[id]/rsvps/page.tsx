import { redirect, notFound } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { getEventById, getRsvpsByEventId, getInviteesByEventId } from "@/lib/db/queries"
import { RsvpsDashboard } from "@/components/admin/rsvps-dashboard"

interface RsvpsPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function RsvpsPage({ params }: RsvpsPageProps) {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const { id } = await params
  const event = await getEventById(id)

  if (!event) {
    notFound()
  }

  const rsvps = await getRsvpsByEventId(id)
  const invitees = await getInviteesByEventId(id)

  return <RsvpsDashboard event={event} rsvps={rsvps} invitees={invitees} />
}
