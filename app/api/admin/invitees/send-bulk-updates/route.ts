import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { getEventById, getInviteesByEventId } from "@/lib/db/queries"
import { sendBulkInvitations, sendBulkScheduleUpdates } from "@/lib/email/send"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { eventId } = await request.json()

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 })
    }

    const event = await getEventById(eventId)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const invitees = await getInviteesByEventId(eventId)

    if (invitees.length === 0) {
      return NextResponse.json({ error: "No invitees found" }, { status: 400 })
    }

    const eventDate = new Date(event.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const invitations = invitees.map((invitee) => ({
      to: invitee.email,
      inviteeName: invitee.name,
      eventName: event.name,
      eventDate,
      eventTime: event.time,
      eventLocation: event.location,
      eventDescription: event.description || undefined,
      inviteLink: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${invitee.uniqueToken}`,
    }))

    const results = await sendBulkScheduleUpdates(invitations)

    return NextResponse.json({
      success: true,
      total: results.total,
      successful: results.successful,
      failed: results.failed,
    })
  } catch (error) {
    console.error("[v0] Bulk send API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
