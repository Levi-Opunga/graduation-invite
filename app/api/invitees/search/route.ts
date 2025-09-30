import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { invitees, rsvps } from "@/lib/db/schema"
import { eq, and, sql } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get("name")
    const eventId = searchParams.get("eventId")

    if (!name || !eventId) {
      return NextResponse.json({ found: false }, { status: 400 })
    }

    const result = await db
      .select({
        id: invitees.id,
        name: invitees.name,
        email: invitees.email,
        token: invitees.uniqueToken,
        rsvpId: rsvps.id,
        rsvpStatus: rsvps.status,
      })
      .from(invitees)
      .leftJoin(rsvps, eq(rsvps.inviteeId, invitees.id))
      .where(and(sql`LOWER(${invitees.name}) = LOWER(${name})`, eq(invitees.eventId, eventId)))
      .limit(1)

    if (result.length === 0) {
      return NextResponse.json({ found: false })
    }

    const invitee = result[0]

    return NextResponse.json({
      found: true,
      invitee: {
        name: invitee.name,
        email: invitee.email,
        token: invitee.token,
        hasRsvped: !!invitee.rsvpId,
        rsvpStatus: invitee.rsvpStatus,
      },
    })
  } catch (error) {
    console.error("Invitee search error:", error)
    return NextResponse.json({ found: false }, { status: 500 })
  }
}
