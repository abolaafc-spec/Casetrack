import { createClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app/app-header"
import { DepartmentsManager } from "@/components/app/departments-manager"

export default async function DepartmentsPage() {
  const supabase = await createClient()
  const { data: departments } = await supabase
    .from("departments")
    .select("id, name, description, color, created_at")
    .order("created_at", { ascending: true })

  // Counts via separate query
  const { data: counts } = await supabase
    .from("patients")
    .select("department_id")

  const countMap: Record<string, number> = {}
  counts?.forEach((p) => {
    if (p.department_id) countMap[p.department_id] = (countMap[p.department_id] ?? 0) + 1
  })

  return (
    <>
      <AppHeader title="Departments" subtitle="Group patients by service" back="/app" />
      <div className="px-5 pt-5">
        <DepartmentsManager
          initialDepartments={(departments ?? []).map((d) => ({
            ...d,
            patient_count: countMap[d.id] ?? 0,
          }))}
        />
      </div>
    </>
  )
}
