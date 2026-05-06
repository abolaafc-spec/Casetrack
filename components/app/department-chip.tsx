import { cn, DEPARTMENT_COLORS } from "@/lib/utils"

export function DepartmentChip({
  name,
  color,
  count,
  className,
}: {
  name: string
  color: string
  count?: number
  className?: string
}) {
  const palette = DEPARTMENT_COLORS[color] ?? DEPARTMENT_COLORS.teal
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium ring-1",
        palette.bg,
        palette.text,
        palette.ring,
        className,
      )}
    >
      <span className={cn("inline-block h-2 w-2 rounded-full", palette.text.replace("text-", "bg-"))} />
      {name}
      {typeof count === "number" ? (
        <span className="text-xs opacity-70">· {count}</span>
      ) : null}
    </div>
  )
}
