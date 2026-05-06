import Link from "next/link"
import { ArrowRight, Activity, ClipboardList, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8 safe-top safe-bottom">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <span className="font-serif text-2xl tracking-tight">CaseTrack</span>
          </div>
          <Link
            href="/auth/login"
            className="text-sm font-medium text-foreground/70 hover:text-foreground"
          >
            Sign in
          </Link>
        </header>

        <section className="mt-16 flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Built for clinicians, by clinicians
          </div>

          <h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-balance">
            Quiet case notes for busy wards.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            CaseTrack is a focused mobile companion for doctors and surgeons.
            Track patients, capture cases, and document daily ward rounds —
            without the paperwork.
          </p>

          <div className="mt-8 grid gap-3">
            <FeatureRow
              icon={<ClipboardList className="h-5 w-5" />}
              title="Structured case entry"
              body="Multi-step intake from chief complaint to plan."
            />
            <FeatureRow
              icon={<Activity className="h-5 w-5" />}
              title="Daily ward rounds"
              body="Vitals, SOAP notes, and a clean timeline per patient."
            />
            <FeatureRow
              icon={<Stethoscope className="h-5 w-5" />}
              title="Departments & teams"
              body="Group patients by service. Find them in two taps."
            />
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3">
          <Link href="/auth/sign-up" className="block">
            <Button size="full" className="group">
              Create your account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/auth/login" className="block">
            <Button size="full" variant="secondary">
              I already have an account
            </Button>
          </Link>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            For clinical documentation only. Not a substitute for institutional records.
          </p>
        </div>
      </div>
    </main>
  )
}

function FeatureRow({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  )
}
