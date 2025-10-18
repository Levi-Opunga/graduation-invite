"use client"

import type React from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowLeft, Copy, Mail, Plus} from "lucide-react"
import Link from "next/link"
import {toast} from "sonner";
import {deleteInvitee} from "@/lib/db/queries";

interface Event {
    id: string
    name: string
    date: string
    time: string
    location: string
}

interface Invitee {
    id: string
    eventId: string
    name: string
    email: string
    phone: string | null
    uniqueToken: string
    invitedAt: Date | null
    createdAt: Date
}

interface InviteesManagerProps {
    event: Event
    invitees: Invitee[]
}

export function InviteesManager({event, invitees: initialInvitees}: InviteesManagerProps) {
    const router = useRouter()
    const [invitees, setInvitees] = useState(initialInvitees)
    const [isAdding, setIsAdding] = useState(false)
    const [isSendingBulk, setIsSendingBulk] = useState(false)
    const [isSendingBulkScheduleUpdates, setIsSendingBulkScheduleUpdates] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        sendEmail: false,
    })

    const handleAddInvitee = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsAdding(true)

        try {
            const response = await fetch("/api/admin/invitees", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    eventId: event.id,
                    ...formData,
                }),
            })

            if (response.ok) {
                setFormData({name: "", email: "", phone: "", sendEmail: false})
                toast.success("Invitee added successfully")
                const newInvitee = await response.json()
                setInvitees([...invitees, newInvitee.invitee])
                router.refresh()
            } else {
                toast.error("Failed to add invitee. Please try again.")
            }
        } catch (error) {
            console.error("[v0] Add invitee error:", error)
            toast.error("An error occurred. Please try again.")
        } finally {
            setIsAdding(false)
        }
    }

    const handleSendBulkInvitations = async () => {
        if (!confirm(`Send invitation emails to all ${invitees.length} invitees?`)) {
            return
        }

        setIsSendingBulk(true)

        try {
            const response = await fetch("/api/admin/invitees/send-bulk", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({eventId: event.id}),
            })

            const data = await response.json()

            if (response.ok) {
                alert(`Successfully sent ${data.successful} invitations. ${data.failed} failed.`)
                router.refresh()
            } else {
                alert(data.error || "Failed to send invitations. Please try again.")
            }
        } catch (error) {
            console.error("[v0] Bulk send error:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsSendingBulk(false)
        }
    }

    const handleSendBulkScheduleUpdates = async () => {
        setIsSendingBulkScheduleUpdates(true)
        try {
            const response = await fetch("/api/admin/invitees/send-bulk-updates", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({eventId: event.id}),
            })

            const data = await response.json()

            if (response.ok) {
                alert(`Successfully sent ${data.successful} schedule updates!`)
            } else {
                alert(data.error || "Failed to send schedule updates. Please try again.")
            }
        } catch (error) {
            console.error("[v0] Bulk send error:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsSendingBulkScheduleUpdates(false)
        }
    }

    const copyInviteLink = (token: string) => {
        const url = `${window.location.origin}/invite/${token}`
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Invite link copied to clipboard")
        })
    }

    const copyWhatsappInvite = (invitee: Invitee, event: { date: string; time: string; location: string }) => {
        const url = `${window.location.origin}/invite/${invitee.uniqueToken}`;

        // Format date in a friendly Kenyan style: "Saturday, 17th October 2025"
        const eventDate = new Date(event.date).toLocaleDateString("en-KE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const confirmDate = new Date("2025-10-25").toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const template = `
Dear ${invitee.name}

I’m excited to invite you to my graduation dinner! 🎓

Date: ${eventDate}  
Time: ${event.time}  
Venue: ${event.location}

Kindly confirm your attendance through the link below or via message. 👇  
${url}

You can use the same link later to update your RSVP or search using the code below on the home page.  
    
Code: ${invitee.uniqueToken}

Please confirm your attendance by ${confirmDate} to avoid any inconvenience.

Looking forward to celebrating together! 🥳
  `.trim();

        navigator.clipboard.writeText(template).then(() => {
            toast.success("WhatsApp invite message copied to clipboard!");
        });
    };


    return (
        <div className="min-h-screen bg-background dark">
            <header className="border-b bg-card">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/admin/dashboard">
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Back to Dashboard
                        </Link>
                    </Button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-foreground">{event.name}</h1>
                            <p className="text-sm text-muted-foreground">Manage invitees</p>
                        </div>
                        <div className="flex items-center gap-6">
                            {invitees.length > 0 && (
                                <Button onClick={handleSendBulkInvitations} disabled={isSendingBulk}>
                                    <Mail className="w-4 h-4 mr-2"/>
                                    {isSendingBulk ? "Sending..." : "Send All Invitations"}
                                </Button>
                            )}

                            {invitees.length > 0 && (
                                <Button onClick={handleSendBulkScheduleUpdates} disabled={isSendingBulkScheduleUpdates}>
                                    <Mail className="w-4 h-4 mr-2"/>
                                    {isSendingBulkScheduleUpdates ? "Sending..." : "Send All Schedule Updates"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Add Invitee Form */}
                <Card className="p-6">
                    <h2 className="font-serif text-xl text-foreground mb-4">Add New Invitee</h2>
                    <form onSubmit={handleAddInvitee} className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (Optional)</Label>
                                <Input
                                    id="phone"
                                    placeholder="+1 234 567 8900"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="sendEmail"
                                checked={formData.sendEmail}
                                onCheckedChange={(checked) => setFormData({...formData, sendEmail: checked as boolean})}
                            />
                            <Label htmlFor="sendEmail" className="font-normal cursor-pointer">
                                Send invitation email immediately
                            </Label>
                        </div>

                        <Button type="submit" disabled={isAdding}>
                            <Plus className="w-4 h-4 mr-2"/>
                            {isAdding ? "Adding..." : "Add Invitee"}
                        </Button>
                    </form>
                </Card>

                {/* Invitees List */}
                <div>
                    <h2 className="font-serif text-2xl text-foreground mb-4">Invitees ({invitees.length})</h2>

                    {invitees.length === 0 ? (
                        <Card className="p-12 text-center">
                            <p className="text-muted-foreground">No invitees yet. Add your first invitee above.</p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {invitees.map((invitee) => (
                                <Card key={invitee.id} className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-foreground">{invitee.name}</h3>
                                            <p className="text-sm text-muted-foreground">{invitee.email}</p>
                                            {invitee.phone &&
                                                <p className="text-sm text-muted-foreground">{invitee.phone}</p>}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline"
                                                    onClick={() => copyWhatsappInvite(invitee, event)}>
                                                Copy Whatsapp Invite
                                            </Button>
                                            <Button size="sm" variant="outline"
                                                    onClick={() => copyInviteLink(invitee.uniqueToken)}>
                                                <Copy className="w-4 h-4 mr-2"/>
                                                Copy Link
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={async () => {
                                                deleteInvitee(invitee.id).then(
                                                    () => {
                                                        setInvitees(invitees.filter(i => i.id !== invitee.id))
                                                        toast.success("Invitee deleted successfully")
                                                    },
                                                    (error) => {
                                                        console.error("Error deleting invitee:", error)
                                                        toast.error("Failed to delete invitee")
                                                    }
                                                )
                                            }}>
                                                Delete Invitee
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
