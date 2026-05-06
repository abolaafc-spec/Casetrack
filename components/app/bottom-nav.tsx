"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, ClipboardList, User } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/app", label: "Home", icon: Home, exact: true },
  { href: "/app/patients", label: "Patients", icon: Users },
  { href: "/app/rounds", label: "Rounds", icon: ClipboardList },
  { href: "/app/profile", label: "Profile", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-border bg-card/95 backdrop-blur safe-bottom">
      <div className="grid grid-cols-4 gap-1 px-2 pt-2">
        {items.map((item) => {
          const Icon = item.icon
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("h-5 w-5", active && "text-primary")} strokeWidth={active ? 2.4 : 2} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
