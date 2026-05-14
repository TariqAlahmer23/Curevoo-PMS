import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { SprintCard } from '../components/SprintCard'
import { trackLabels } from '../data/theme'
import type { SprintRecord, TeamMember } from '../types'

type Filter = 'all' | 'backend' | 'frontend' | 'ai' | 'deployment' | 'completed' | 'pending'

type Props = {
  sprints: SprintRecord[]
  members: TeamMember[]
  onToggleTask: (sprintId: string, taskId: string, completed: boolean) => void
  onUpdateNote: (sprintId: string, taskId: string, note: string) => void
  onUpdateTaskTitle: (sprintId: string, taskId: string, title: string) => void
  onDeleteTask: (sprintId: string, taskId: string) => void
  onAddTask: (sprintId: string, title: string) => void
  onAddSprint: () => void
  onUpdateSprint: (sprintId: string, updates: Partial<Pick<SprintRecord, 'title' | 'goal' | 'track'>>) => void
}

export function SprintsPage({
  sprints,
  members,
  onToggleTask,
  onUpdateNote,
  onUpdateTaskTitle,
  onDeleteTask,
  onAddTask,
  onAddSprint,
  onUpdateSprint
}: Props) {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return sprints
    if (filter === 'completed') {
      return sprints.filter((sprint) => sprint.tasks.length > 0 && sprint.tasks.every((task) => task.status === 'completed'))
    }
    if (filter === 'pending') {
      return sprints.filter((sprint) => sprint.tasks.some((task) => task.status !== 'completed'))
    }
    return sprints.filter((sprint) => sprint.track === filter)
  }, [sprints, filter])

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'الكل' },
    { key: 'backend', label: trackLabels.backend },
    { key: 'frontend', label: trackLabels.frontend },
    { key: 'ai', label: trackLabels.ai },
    { key: 'deployment', label: trackLabels.deployment },
    { key: 'completed', label: 'مكتمل' },
    { key: 'pending', label: 'غير مكتمل' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`rounded-lg px-3 py-1.5 text-xs ${filter === item.key ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={onAddSprint} className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-xs font-medium text-white">
          <Plus size={14} /> إضافة سبرنت
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-soft">لا توجد سبرنتات ضمن هذا الفلتر.</div>
      ) : (
        filtered.map((sprint) => (
          <SprintCard
            key={sprint.id}
            sprint={sprint}
            members={members}
            onToggleTask={onToggleTask}
            onUpdateNote={onUpdateNote}
            onUpdateTaskTitle={onUpdateTaskTitle}
            onDeleteTask={onDeleteTask}
            onAddTask={onAddTask}
            onUpdateSprint={onUpdateSprint}
          />
        ))
      )}
    </div>
  )
}
