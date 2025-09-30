import { type NextRequest, NextResponse } from "next/server"
import { createOrUpdateRsvp } from "@/lib/db/queries"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { inviteeId, eventId, status, guestsCount, dietaryRestrictions, notes } = body

    // Validate required fields
    if (!inviteeId || !eventId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create or update RSVP
    const rsvp = await createOrUpdateRsvp({
      inviteeId,
      eventId,
      status,
      guestsCount: guestsCount || 1,
      dietaryRestrictions: dietaryRestrictions || undefined,
      notes: notes || undefined,
    })

    return NextResponse.json({ success: true, rsvp })
  } catch (error) {
    console.error("[v0] RSVP API error:", error)
    return NextResponse.json({ error: "Failed to process RSVP" }, { status: 500 })
  }
}
