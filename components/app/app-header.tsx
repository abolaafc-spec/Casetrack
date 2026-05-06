import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export function AppHeader({
  title,
  subtitle,
  back,
  right,
  className,
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  back?: string
  right?: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-5 py-4 backdrop-blur",
        className,
      )}
    >
      {back ? (
        <Link
          href={back}
          className="-ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 hover:bg-muted hover:text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      ) : null}
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-serif text-2xl leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </header>
  )
}
