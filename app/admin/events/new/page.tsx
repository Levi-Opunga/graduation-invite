import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { EventForm } from "@/components/admin/event-form"

export default async function NewEventPage() {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background dark">
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="font-serif text-2xl text-foreground">Create New Event</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <EventForm />
      </main>
    </div>
  )
}
