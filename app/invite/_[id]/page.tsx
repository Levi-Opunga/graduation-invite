import { notFound } from "next/navigation"
import { getInviteDetailsByToken } from "@/lib/db/queries"
import { InvitationView } from "@/components/invitation-view"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

interface InvitePageProps {
  params: {
    id: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id: token } = params
  const inviteDetails = await getInviteDetailsByToken(token)

  if (!inviteDetails || !inviteDetails.event) {
    notFound()
  }

  const { invitee, event, rsvp } = inviteDetails

  // If they've already RSVP'd, show their response
  if (rsvp) {
    const accentColor = event.secondaryColor || "#22d3ee"
    const primaryColor = event.primaryColor || "#1a2f4a"

    const statusConfig = {
      attending: {
        icon: CheckCircle2,
        color: "#22c55e",
        title: "You're Attending!",
        message: "We're excited to celebrate with you!",
      },
      not_attending: {
        icon: XCircle,
        color: "#ef4444",
        title: "You're Not Attending",
        message: "We'll miss you, but thank you for letting us know.",
      },
      maybe: {
        icon: Clock,
        color: "#f59e0b",
        title: "You Might Attend",
        message: "Please let us know as soon as you can confirm.",
      },
    }

    const config = statusConfig[rsvp.status as keyof typeof statusConfig] || statusConfig.maybe
    const StatusIcon = config.icon

    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full space-y-8">
          <Card className="p-12 text-center space-y-6 border-2">
            <div className="flex justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <StatusIcon className="w-8 h-8" style={{ color: config.color }} />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-4xl" style={{ color: primaryColor }}>
                {config.title}
              </h1>
              <p className="text-xl text-muted-foreground">{config.message}</p>
            </div>

            <div className="pt-6 border-t space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guest:</span>
                <span className="font-medium" style={{ color: primaryColor }}>
                  {invitee.name}
                </span>
              </div>

              {rsvp.status === "attending" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Guests:</span>
                  <span className="font-medium" style={{ color: primaryColor }}>
                    {rsvp.guestsCount}
                  </span>
                </div>
              )}

              {rsvp.dietaryRestrictions && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dietary Restrictions:</span>
                  <span className="font-medium" style={{ color: primaryColor }}>
                    {rsvp.dietaryRestrictions}
                  </span>
                </div>
              )}

              {rsvp.notes && (
                <div className="space-y-1">
                  <span className="text-muted-foreground">Notes:</span>
                  <p className="font-medium" style={{ color: primaryColor }}>
                    {rsvp.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Responded:</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(rsvp.respondedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Need to change your response? Please contact the event organizer.
            </p>
          </div>
        </div>
      </main>
    )
  }

  // If they haven't RSVP'd yet, show the invitation form
  return <InvitationView invitee={invitee} event={event} />
}
