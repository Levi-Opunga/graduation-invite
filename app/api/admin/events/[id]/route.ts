import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { updateEvent } from "@/lib/db/queries"

interface RouteContext {
  params: Promise<{
    id: string
  }>
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()
    const { name, date, time, location, description, logoUrl, primaryColor, secondaryColor } = body

    if (!name || !date || !time || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const event = await updateEvent(id, {
      name,
      date,
      time,
      location,
      description: description || undefined,
      logoUrl: logoUrl || undefined,
      primaryColor: primaryColor || undefined,
      secondaryColor: secondaryColor || undefined,
    })

    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error("[v0] Update event API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
