"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, CheckCircle, XCircle, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

interface InviteSearchProps {
  eventId: string // Changed from number to string to match UUID type
}

export function InviteSearch({ eventId }: InviteSearchProps) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    found: boolean
    invitee?: {
      name: string
      email: string
      token: string
      hasRsvped: boolean
      rsvpStatus?: string
    }
  } | null>(null)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/invitees/search?name=${encodeURIComponent(name)}&eventId=${eventId}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Search error:", error)
      setResult({ found: false })
    } finally {
      setLoading(false)
    }
  }

  const handleViewInvite = () => {
    if (result?.invitee?.token) {
      router.push(`/invite/${result.invitee.token}`)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 text-lg py-5"
          disabled={loading}
        />
        <Button type="submit" size="lg" disabled={loading} className="px-8">
          <Search className="w-5 h-5 mr-2" />
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {result && (
        <Card className="p-6 space-y-4 border-2">
          {result.found && result.invitee ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <h3 className="font-serif text-xl text-primary">Invitation Found!</h3>
                  <p className="text-muted-foreground">
                    Welcome, <span className="font-semibold text-foreground">{result.invitee.name}</span>
                  </p>

                  {result.invitee.hasRsvped ? (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        You have already responded:{" "}
                        <span className="font-semibold text-foreground capitalize">{parseRsvpStatus(result.invitee.rsvpStatus)}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        You haven't responded yet. Please RSVP using your personalized invitation.
                      </p>
                    </div>
                  )}

                  <Button onClick={handleViewInvite} className="mt-4 w-full sm:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    View My Invitation
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-serif text-xl text-primary">No Invitation Found</h3>
                <p className="text-muted-foreground mt-1">
                  We couldn't find an invitation for "{name}". Please check the spelling or contact the event organizer.
                </p>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

function parseRsvpStatus(status: string) {
  switch (status) {
    case "attending":
      return "Attending"
    case "not_attending":
      return "Not Attending"
    case "maybe":
      return "Maybe"
    default:
      return "Unknown"
  }
}