import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { getAllEvents } from "@/lib/db/queries"
import { DashboardContent } from "@/components/admin/dashboard-content"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const events = await getAllEvents()

  return <DashboardContent events={events} adminEmail={session.email} />
}
