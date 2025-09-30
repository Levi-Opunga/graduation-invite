import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { createEvent } from "@/lib/db/queries"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, date, time, location, description, primaryColor, secondaryColor } = body

    if (!name || !date || !time || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const event = await createEvent({
      name,
      date,
      time,
      location,
      description: description || undefined,
      primaryColor: primaryColor || undefined,
      secondaryColor: secondaryColor || undefined,
    })

    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error("[v0] Create event API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
