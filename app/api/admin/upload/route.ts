import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { put } from "@vercel/blob"
import path from "path"
import { writeFile } from "fs/promises"


export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save to public/uploads
    const filePath = path.join(process.cwd(), "public", "uploads", file.name)
    await writeFile(filePath, buffer)

    // Local URL
    const url = `/uploads/${file.name}`

    return NextResponse.json({ url })

  } catch (error) {
    console.error("[v0] Upload API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
