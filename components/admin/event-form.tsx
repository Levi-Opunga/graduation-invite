"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"

interface EventFormProps {
  event?: {
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

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [formData, setFormData] = useState({
    name: event?.name || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    description: event?.description || "",
    logoUrl: event?.logoUrl || "",
    primaryColor: event?.primaryColor || "#1a2f4a",
    secondaryColor: event?.secondaryColor || "#22d3ee",
  })

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingLogo(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setFormData((prev) => ({ ...prev, logoUrl: data.url }))
      } else {
        alert("Failed to upload logo. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Logo upload error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsUploadingLogo(false)
    }
  }

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logoUrl: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = event ? `/api/admin/events/${event.id}` : "/api/admin/events"
      const method = event ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        alert("Failed to save event. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Event form error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Event Logo</Label>
          {formData.logoUrl ? (
            <div className="flex items-center gap-4">
              <img
                src={formData.logoUrl || "/placeholder.svg"}
                alt="Event logo"
                className="w-24 h-24 object-contain rounded-lg border"
              />
              <Button type="button" variant="outline" size="sm" onClick={handleRemoveLogo}>
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                disabled={isUploadingLogo}
              />
              <Label htmlFor="logo" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isUploadingLogo ? "Uploading..." : "Click to upload logo"}
                </p>
              </Label>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Event Name</Label>
          <Input
            id="name"
            placeholder="Computer Science Graduation 2025"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              placeholder="10:00 AM"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="University Auditorium, Main Campus"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Join us in celebrating..."
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-lg text-foreground">Color Customization</h3>
          <p className="text-sm text-muted-foreground">
            Customize the colors that will appear on your invitation pages
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  placeholder="#1a2f4a"
                />
              </div>
              <p className="text-xs text-muted-foreground">Used for headings and primary elements</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                  placeholder="#22d3ee"
                />
              </div>
              <p className="text-xs text-muted-foreground">Used for accents and highlights</p>
            </div>
          </div>

          {/* Color Preview */}
          <div className="border rounded-lg p-6 space-y-4">
            <p className="text-sm font-medium text-foreground">Preview</p>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: formData.primaryColor }}
              >
                Primary Color
              </div>
              <div
                className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: formData.secondaryColor }}
              >
                Accent Color
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Saving..." : event ? "Update Event" : "Create Event"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
