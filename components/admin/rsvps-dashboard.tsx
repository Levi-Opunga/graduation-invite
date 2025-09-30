"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, XCircle, HelpCircle, Users } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  name: string
  date: string
}

interface Rsvp {
  id: string
  inviteeId: string
  status: string
  guestsCount: number
  dietaryRestrictions: string | null
  notes: string | null
  respondedAt: Date
}

interface Invitee {
  id: string
  name: string
  email: string
}

interface RsvpsDashboardProps {
  event: Event
  rsvps: Rsvp[]
  invitees: Invitee[]
}

export function RsvpsDashboard({ event, rsvps, invitees }: RsvpsDashboardProps) {
  const attending = rsvps.filter((r) => r.status === "attending")
  const notAttending = rsvps.filter((r) => r.status === "not_attending")
  const maybe = rsvps.filter((r) => r.status === "maybe")
  const noResponse = invitees.length - rsvps.length

  const totalGuests = attending.reduce((sum, r) => sum + r.guestsCount, 0)

  return (
    <div className="min-h-screen bg-background dark">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="font-serif text-2xl text-foreground">{event.name}</h1>
          <p className="text-sm text-muted-foreground">RSVP Summary</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{attending.length}</p>
                <p className="text-sm text-muted-foreground">Attending</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{notAttending.length}</p>
                <p className="text-sm text-muted-foreground">Not Attending</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{maybe.length}</p>
                <p className="text-sm text-muted-foreground">Maybe</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalGuests}</p>
                <p className="text-sm text-muted-foreground">Total Guests</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed RSVPs */}
        <div>
          <h2 className="font-serif text-2xl text-foreground mb-4">Responses</h2>

          {rsvps.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No RSVPs yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {rsvps.map((rsvp) => {
                const invitee = invitees.find((i) => i.id === rsvp.inviteeId)
                if (!invitee) return null

                return (
                  <Card key={rsvp.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">{invitee.name}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              rsvp.status === "attending"
                                ? "bg-green-500/10 text-green-500"
                                : rsvp.status === "not_attending"
                                  ? "bg-red-500/10 text-red-500"
                                  : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {rsvp.status === "attending"
                              ? "Attending"
                              : rsvp.status === "not_attending"
                                ? "Not Attending"
                                : "Maybe"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{invitee.email}</p>

                        {rsvp.status === "attending" && (
                          <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">Guests: {rsvp.guestsCount}</p>
                            {rsvp.dietaryRestrictions && (
                              <p className="text-muted-foreground">Dietary: {rsvp.dietaryRestrictions}</p>
                            )}
                          </div>
                        )}

                        {rsvp.notes && <p className="text-sm text-muted-foreground mt-2 italic">Note: {rsvp.notes}</p>}
                      </div>

                      <p className="text-xs text-muted-foreground">{new Date(rsvp.respondedAt).toLocaleDateString()}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
