import { redirect, notFound } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { getEventById } from "@/lib/db/queries"
import { EventForm } from "@/components/admin/event-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EventEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventEditPage({ params }: EventEditPageProps) {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const { id } = await params
  const event = await getEventById(id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background dark">
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="font-serif text-2xl text-foreground">Edit Event</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <EventForm event={event} />
      </main>
    </div>
  )
}
