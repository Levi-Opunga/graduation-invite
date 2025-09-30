import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { LoginForm } from "@/components/admin/login-form"

export default async function LoginPage() {
  const session = await getSession()

  if (session) {
    redirect("/admin/dashboard")
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-primary">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl text-primary-foreground">Admin Login</h1>
          <p className="text-primary-foreground/80">Sign in to manage your graduation events</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
