import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full p-12 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-primary">Invitation Not Found</h1>
          <p className="text-muted-foreground leading-relaxed">
            We couldn't find an invitation with this link. Please check your invitation email or contact the event
            organizer.
          </p>
        </div>

        <Button asChild className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </Card>
    </main>
  )
}
