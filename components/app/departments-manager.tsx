"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input, Label, Textarea, Select } from "@/components/ui/input"
import { DepartmentChip } from "@/components/app/department-chip"
import { DEPARTMENT_COLORS } from "@/lib/utils"

type Dept = {
  id: string
  name: string
  description: string | null
  color: string
  patient_count: number
}

const COLOR_OPTIONS = Object.keys(DEPARTMENT_COLORS)

export function DepartmentsManager({
  initialDepartments,
}: {
  initialDepartments: Dept[]
}) {
  const router = useRouter()
  const [departments, setDepartments] = useState<Dept[]>(initialDepartments)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("teal")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      setError("Not authenticated")
      setLoading(false)
      return
    }
    const { data, error: insertError } = await supabase
      .from("departments")
      .insert({ user_id: user.id, name, description: description || null, color })
      .select("id, name, description, color, created_at")
      .single()
    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }
    setDepartments((d) => [...d, { ...data!, patient_count: 0 }])
    setName("")
    setDescription("")
    setColor("teal")
    setOpen(false)
    setLoading(false)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this department? Patients will not be deleted but will be uncategorised.")) return
    const supabase = createClient()
    const { error } = await supabase.from("departments").delete().eq("id", id)
    if (!error) {
      setDepartments((d) => d.filter((x) => x.id !== id))
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {departments.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="font-semibold">No departments yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Departments help you group patients by ward, service, or unit.
          </p>
        </Card>
      ) : (
        departments.map((d) => (
          <Card key={d.id} className="flex items-center justify-between p-4">
            <div className="min-w-0 flex-1">
              <DepartmentChip name={d.name} color={d.color} count={d.patient_count} />
              {d.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.description}
                </p>
              ) : null}
            </div>
            <button
              onClick={() => handleDelete(d.id)}
              aria-label={`Delete ${d.name}`}
              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </Card>
        ))
      )}

      {open ? (
        <Card className="p-5">
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="dept_name">Department name</Label>
              <Input
                id="dept_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="General Surgery"
                required
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="dept_desc">Description (optional)</Label>
              <Textarea
                id="dept_desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ward 4B, attending: Dr. Mensah"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="dept_color">Tag color</Label>
              <Select id="dept_color" value={color} onChange={(e) => setColor(e.target.value)}>
                {COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c[0].toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </Select>
              <div className="mt-2.5">
                <DepartmentChip name={name || "Preview"} color={color} />
              </div>
            </div>

            {error ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Adding…" : "Add department"}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button variant="secondary" size="full" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          New department
        </Button>
      )}
    </div>
  )
}
