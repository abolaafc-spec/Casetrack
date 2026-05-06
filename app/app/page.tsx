import Link from "next/link"
import { Plus, ArrowRight, Stethoscope } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app/app-header"
import { Card, Badge, StatusDot } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DepartmentChip } from "@/components/app/department-chip"
import { formatRelative } from "@/lib/utils"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [{ data: profile }, { data: departments }, { data: patients }, { data: roundsToday }] =
    await Promise.all([
      supabase.from("profiles").select("full_name, role").eq("id", user!.id).maybeSingle(),
      supabase
        .from("departments")
        .select("id, name, color")
        .order("created_at", { ascending: true }),
      supabase
        .from("patients")
        .select("id, full_name, status, bed_number, primary_diagnosis, updated_at, department_id")
        .order("updated_at", { ascending: false })
        .limit(5),
      supabase
        .from("ward_rounds")
        .select("id")
        .eq("round_date", new Date().toISOString().slice(0, 10)),
    ])

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 18) return "Good afternoon"
    return "Good evening"
  })()
  const firstName = profile?.full_name?.split(" ")[0] ?? "Doctor"

  const totalPatients = patients?.length ?? 0
  const critical = patients?.filter((p) => p.status === "critical").length ?? 0

  return (
    <>
      <AppHeader
        title={`${greeting}, ${firstName}.`}
        subtitle={profile?.role ? `Logged in as ${profile.role}` : undefined}
      />

      <div className="px-5 pt-5">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Today
              </p>
              <p className="mt-1 font-serif text-3xl tracking-tight">
                {totalPatients} patients
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {roundsToday?.length ?? 0} round{(roundsToday?.length ?? 0) === 1 ? "" : "s"} logged
                {critical > 0 ? (
                  <>
                    {" · "}
                    <span className="text-destructive">{critical} critical</span>
                  </>
                ) : null}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-7 w-7" strokeWidth={2.2} />
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-border">
            <Link
              href="/app/patients/new"
              className="flex items-center justify-center gap-2 border-r border-border px-4 py-3.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
              New patient
            </Link>
            <Link
              href="/app/rounds"
              className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Start round
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>

      <section className="px-5 pt-7">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl tracking-tight">Departments</h2>
          <Link
            href="/app/departments"
            className="text-sm font-medium text-primary hover:underline"
          >
            Manage
          </Link>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {departments && departments.length > 0 ? (
            departments.map((d) => (
              <Link
                key={d.id}
                href={`/app/patients?department=${d.id}`}
                className="shrink-0"
              >
                <DepartmentChip name={d.name} color={d.color} />
              </Link>
            ))
          ) : (
            <Link href="/app/departments">
              <Card className="px-4 py-3 text-sm text-muted-foreground hover:bg-muted">
                Add your first department
              </Card>
            </Link>
          )}
        </div>
      </section>

      <section className="px-5 pt-7">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl tracking-tight">Recent patients</h2>
          <Link
            href="/app/patients"
            className="text-sm font-medium text-primary hover:underline"
          >
            See all
          </Link>
        </div>

        <div className="mt-3 flex flex-col gap-2.5">
          {patients && patients.length > 0 ? (
            patients.map((p) => (
              <Link key={p.id} href={`/app/patients/${p.id}`}>
                <Card className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <StatusDot status={p.status as any} className="mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {p.full_name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.primary_diagnosis ?? "No primary diagnosis yet"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {p.bed_number ? (
                      <Badge variant="muted">Bed {p.bed_number}</Badge>
                    ) : null}
                    <span className="text-[11px] text-muted-foreground">
                      {formatRelative(p.updated_at)}
                    </span>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="flex flex-col items-start gap-3 p-5">
              <div>
                <p className="font-semibold">No patients yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add your first patient to start documenting cases.
                </p>
              </div>
              <Link href="/app/patients/new">
                <Button>
                  <Plus className="h-4 w-4" />
                  Add patient
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </section>
    </>
  )
}
