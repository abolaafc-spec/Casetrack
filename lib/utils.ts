import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name?: string | null) {
  if (!name) return "??"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const DEPARTMENT_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  teal: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/20" },
  coral: { bg: "bg-accent/10", text: "text-accent", ring: "ring-accent/20" },
  amber: { bg: "bg-warning/10", text: "text-warning", ring: "ring-warning/20" },
  sage: { bg: "bg-success/10", text: "text-success", ring: "ring-success/20" },
  slate: { bg: "bg-muted", text: "text-muted-foreground", ring: "ring-border" },
}

export function formatDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function formatRelative(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return formatDate(d)
}
