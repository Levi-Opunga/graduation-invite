"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, MapPin, Clock, CheckCircle2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface InvitationViewProps {
  invitee: {
    id: string
    eventId: string
    name: string
    email: string
    uniqueToken: string
  }
  event: {
    id: string
    name: string
    date: string
    time: string
    location: string
    description: string | null
    logoUrl: string | null
    primaryColor: string | null
    secondaryColor: string | null
  }
}

export function InvitationView({ invitee, event }: InvitationViewProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    status: "attending",
    guestsCount: 1,
    dietaryRestrictions: "",
    notes: "",
  })

  const primaryColor = event.primaryColor || "#1a2f4a"
  const accentColor = event.secondaryColor || "#22d3ee"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviteeId: invitee.id,
          eventId: event.id,
          ...formData,
          guestsCount: 1,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert("Failed to submit RSVP. Please try again.")
      }
    } catch (error) {
      console.error("[v0] RSVP submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: primaryColor }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: accentColor }} />
        </div>

        <Card className="max-w-2xl w-full p-12 text-center space-y-8 rounded-3xl shadow-2xl border-0 relative overflow-hidden bg-white/80 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${accentColor})` }} />

          <div className="flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center relative animate-pulse"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: accentColor }} />
              <CheckCircle2 className="w-10 h-10 relative z-10" style={{ color: accentColor }} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-5xl tracking-tight" style={{ color: primaryColor }}>
              Thank You!
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-md mx-auto">
              Your RSVP has been received. We look forward to celebrating with you!
            </p>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
            <Sparkles className="w-4 h-4 -mt-2" style={{ color: primaryColor }} />
            <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
          </div>
        </Card>
      </main>
    )
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-screen px-4 py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 -left-20 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: primaryColor }} />
        <div className="absolute bottom-32 -right-20 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: accentColor }} />
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-8">
          <div className="flex justify-center items-center gap-3">
            <div
              className="w-20 h-1 rounded-full transform -rotate-3"
              style={{ background: accentColor }}
            />
            <div
              className="w-32 h-1.5 rounded-full"
              style={{ background: primaryColor }}
            />
            <div
              className="w-20 h-1 rounded-full transform rotate-3"
              style={{ background: accentColor }}
            />
          </div>

          {event.logoUrl && (
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" style={{ background: accentColor }} />
                <img
                  src={event.logoUrl || "/placeholder.svg"}
                  alt="Event logo"
                  className="h-48 w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-4xl  "
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h1
              className="font-serif text-2xl md:text-5xl text-balance leading-tight tracking-tight"
              style={{ color: primaryColor }}
            >
              {event.name}
            </h1>

            <div className="max-w-xl mx-auto">
              <p className=" text-slate-600 leading-relaxed">
                Dear{" "}
                <span className="font-semibold relative inline-block" style={{ color: primaryColor }}>
                  {invitee.name}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 opacity-30" style={{ background: accentColor }} />
                </span>
                , you are cordially invited to attend
              </p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <Card className="p-10 space-y-8 border rounded-3xl shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden relative border-gray-400/20">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl -mr-32 -mt-32" style={{ background: accentColor }} />

          <div className="space-y-8 relative z-10">
            <div className="flex items-start gap-5 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${accentColor}15` }}>
                <Calendar className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg mb-1" style={{ color: primaryColor }}>
                  Date
                </p>
                <p className="text-slate-600 text-lg">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${accentColor}15` }}>
                <Clock className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg mb-1" style={{ color: primaryColor }}>
                  Time
                </p>
                <p className="text-slate-600 text-lg">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${accentColor}15` }}>
                <MapPin className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg mb-1" style={{ color: primaryColor }}>
                  Location
                </p>
                <p className="text-slate-600 text-lg">{event.location}</p>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="pt-8 border-t border-slate-200 relative z-10">
              <p className="text-slate-600 leading-relaxed text-lg">{event.description}</p>
            </div>
          )}
        </Card>

        {/* RSVP Form */}
        <Card className="p-10 border rounded-3xl shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden relative border-gray-400/20">
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl -ml-32 -mb-32" style={{ background: primaryColor }} />

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="space-y-3">
              <h2 className="font-serif text-4xl tracking-tight" style={{ color: primaryColor }}>
                RSVP
              </h2>
              <p className="text-slate-600 text-lg">Please let us know if you can attend</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold" style={{ color: primaryColor }}>Will you be attending?</Label>
                <RadioGroup
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-slate-200 hover:border-current transition-colors cursor-pointer" style={{ borderColor: formData.status === 'attending' ? accentColor : undefined }}>
                    <RadioGroupItem value="attending" id="attending" />
                    <Label htmlFor="attending" className="font-normal cursor-pointer text-base flex-1">
                      Yes, I will attend
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-slate-200 hover:border-current transition-colors cursor-pointer" style={{ borderColor: formData.status === 'not_attending' ? accentColor : undefined }}>
                    <RadioGroupItem value="not_attending" id="not_attending" />
                    <Label htmlFor="not_attending" className="font-normal cursor-pointer text-base flex-1">
                      No, I cannot attend
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-slate-200 hover:border-current transition-colors cursor-pointer" style={{ borderColor: formData.status === 'maybe' ? accentColor : undefined }}>
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe" className="font-normal cursor-pointer text-base flex-1">
                      Maybe
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.status === "attending" && (
                <>
                  <input type="hidden" value={1} />

                  <div className="space-y-3">
                    <Label htmlFor="dietary" className="text-base font-semibold" style={{ color: primaryColor }}>
                      Dietary Restrictions <span className="text-slate-400 font-normal">(Optional)</span>
                    </Label>
                    <Input
                      id="dietary"
                      placeholder="e.g., Vegetarian, Gluten-free"
                      value={formData.dietaryRestrictions}
                      onChange={(e) =>
                        setFormData({ ...formData, dietaryRestrictions: e.target.value })
                      }
                      className="h-12 px-4 rounded-xl border-2 focus:border-current text-base"
                    />
                  </div>
                </>
              )}

              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base font-semibold" style={{ color: primaryColor }}>
                  Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or messages"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="px-4 py-3 rounded-xl border-2 focus:border-current text-base resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-white text-lg font-semibold h-14 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group"
              disabled={isSubmitting}
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              }}
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit RSVP"}</span>
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}