import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BottomNav } from "@/components/app/bottom-nav"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <main className="flex-1 pb-24">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
