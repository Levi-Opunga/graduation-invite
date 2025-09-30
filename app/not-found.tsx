import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-12 text-center space-y-6">
        <h1 className="font-serif text-6xl text-primary">404</h1>
        <h2 className="font-serif text-2xl text-primary">Invitation Not Found</h2>
        <p className="text-muted-foreground leading-relaxed">
          The invitation link you are looking for does not exist or has expired.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </Card>
    </main>
  )
}
