import { redirect, notFound } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { getEventById, getInviteesByEventId } from "@/lib/db/queries"
import { InviteesManager } from "@/components/admin/invitees-manager"

interface InviteesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function InviteesPage({ params }: InviteesPageProps) {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const { id } = await params
  const event = await getEventById(id)

  if (!event) {
    notFound()
  }

  const invitees = await getInviteesByEventId(id)

  return <InviteesManager event={event} invitees={invitees} />
}
