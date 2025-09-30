"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Users, LogOut, Plus, BarChart } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string | null
  logoUrl: string | null
  primaryColor: string | null
  secondaryColor: string | null
  createdAt: Date
  updatedAt: Date
}

interface DashboardContentProps {
  events: Event[]
  adminEmail: string
}

export function DashboardContent({ events, adminEmail }: DashboardContentProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{adminEmail}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>
            <LogOut className="w-4 h-4 mr-2" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl text-foreground">Events</h2>
          <Button asChild>
            <Link href="/admin/events/new">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <Card className="p-12 text-center space-y-4">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-4">Create your first graduation event to get started</p>
              <Button asChild>
                <Link href="/admin/events/new">Create Event</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="p-6 space-y-4 hover:border-accent transition-colors">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-foreground">{event.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button asChild variant="outline" size="sm" className="bg-transparent">
                    <Link href={`/admin/events/${event.id}`}>Edit</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="bg-transparent">
                    <Link href={`/admin/events/${event.id}/invitees`}>
                      <Users className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="bg-transparent">
                    <Link href={`/admin/events/${event.id}/rsvps`}>
                      <BarChart className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
