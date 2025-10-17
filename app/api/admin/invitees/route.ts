import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { createInvitee, getEventById,deleteInvitee,getInviteeByToken } from "@/lib/db/queries"
import { generateUniqueToken } from "@/lib/utils/token"
import { sendInvitationEmail } from "@/lib/email/send"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { eventId, name, email, phone, sendEmail } = body

    if (!eventId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const uniqueToken = generateUniqueToken()

    const invitee = await createInvitee({
      eventId,
      name,
      email,
      phone: phone || undefined,
      uniqueToken,
    })

    if (sendEmail) {
      const event = await getEventById(eventId)

      if (event) {
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${uniqueToken}`

        const eventDate = new Date(event.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        await sendInvitationEmail({
          to: email,
          inviteeName: name,
          eventName: event.name,
          eventDate,
          eventTime: event.time,
          eventLocation: event.location,
          eventDescription: event.description || undefined,
          inviteLink,
        })
      }
    }

    return NextResponse.json({ success: true, invitee })
  } catch (error) {
    console.error("[v0] Create invitee API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
    try {
        const session = await getSession()
        const searchParams = request.nextUrl.searchParams
        const uniqueToken = searchParams.get("uniqueToken")
        if (!uniqueToken) {
            return NextResponse.json({ error: "Missing uniqueToken" }, { status: 400 })
        }

        const invitee = await getInviteeByToken(uniqueToken)
        return NextResponse.json(
            {
                success: true,
                invitee
            },
        )

    } catch (error) {
        console.error("[v0] Get invitees API error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession()
        const searchParams = request.nextUrl.searchParams
        const uniqueToken = searchParams.get("uniqueToken")
        if (!uniqueToken) {
            return NextResponse.json({ error: "Missing uniqueToken" }, { status: 400 })
        }

        const invitee = await deleteInvitee(uniqueToken)
        return NextResponse.json(
            {
                success: true,
                invitee
            },
        )
    } catch (error) {
        console.error("[v0] Delete invitee API error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}