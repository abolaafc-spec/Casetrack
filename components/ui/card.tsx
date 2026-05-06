import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card border border-border shadow-[0_1px_2px_rgba(20,30,40,0.04)]",
        className,
      )}
      {...props}
    />
  )
}

export function StatusDot({
  status,
  className,
}: {
  status: "active" | "discharged" | "critical" | "stable" | "observation"
  className?: string
}) {
  const colors: Record<string, string> = {
    active: "bg-success",
    stable: "bg-success",
    critical: "bg-destructive",
    observation: "bg-warning",
    discharged: "bg-muted-foreground/50",
  }
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        colors[status] ?? "bg-muted-foreground/50",
        className,
      )}
    />
  )
}

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode
  variant?: "default" | "muted" | "primary" | "accent" | "success" | "warning" | "destructive"
  className?: string
}) {
  const variants: Record<string, string> = {
    default: "bg-card border border-border text-foreground",
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
