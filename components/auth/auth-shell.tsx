import Link from "next/link"
import { Stethoscope } from "lucide-react"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8 safe-top safe-bottom">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="font-serif text-xl tracking-tight">CaseTrack</span>
        </Link>

        <div className="mt-12">
          <h1 className="font-serif text-4xl leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 flex-1">{children}</div>

        {footer ? (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        ) : null}
      </div>
    </main>
  )
}
