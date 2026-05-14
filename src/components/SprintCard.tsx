import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock3, Pencil, Save, Trash2, X } from 'lucide-react'
import type { SprintRecord, TeamMember } from '../types'
import { sprintProgress } from '../utils/metrics'
import { trackLabels } from '../data/theme'

type Props = {
  sprint: SprintRecord
  members: TeamMember[]
  onToggleTask: (sprintId: string, taskId: string, completed: boolean) => void
  onUpdateNote: (sprintId: string, taskId: string, note: string) => void
  onUpdateTaskTitle: (sprintId: string, taskId: string, title: string) => void
  onDeleteTask: (sprintId: string, taskId: string) => void
  onAddTask: (sprintId: string, title: string) => void
  onUpdateSprint: (sprintId: string, updates: Partial<Pick<SprintRecord, 'title' | 'goal' | 'track'>>) => void
}

export function SprintCard({
  sprint,
  members,
  onToggleTask,
  onUpdateNote,
  onUpdateTaskTitle,
  onDeleteTask,
  onAddTask,
  onUpdateSprint
}: Props) {
  const [editing, setEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(sprint.title)
  const [draftGoal, setDraftGoal] = useState(sprint.goal)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const assignedNames = sprint.assignedTo.map((id) => members.find((m) => m.id === id)?.name).filter(Boolean).join('، ')
  const progress = sprintProgress(sprint)

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-wide text-brand-600">{sprint.phase}</p>
          {editing ? (
            <div className="mt-2 space-y-2">
              <input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <input value={draftGoal} onChange={(e) => setDraftGoal(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900">{sprint.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{sprint.goal}</p>
            </>
          )}
          <p className="mt-2 text-xs text-slate-500">المسؤول: {assignedNames}</p>
          <p className="mt-1 text-xs text-slate-500">المسار: {trackLabels[sprint.track]}</p>
        </div>

        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button
                onClick={() => {
                  onUpdateSprint(sprint.id, { title: draftTitle.trim() || sprint.title, goal: draftGoal.trim() || sprint.goal })
                  setEditing(false)
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white"
              >
                <Save size={14} /> حفظ
              </button>
              <button onClick={() => setEditing(false)} className="inline-flex items-center gap-1 rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">
                <X size={14} /> إلغاء
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
              <Pencil size={14} /> تعديل
            </button>
          )}

          <div className="min-w-24 rounded-xl bg-slate-100 px-3 py-2 text-center">
            <p className="text-xs text-slate-500">التقدم</p>
            <p className="text-lg font-semibold text-slate-900">{progress}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div className="h-full rounded-full bg-brand-600" animate={{ width: `${progress}%` }} />
      </div>

      <ul className="mt-4 space-y-3">
        {sprint.tasks.map((task) => (
          <li key={task.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                checked={task.status === 'completed'}
                onChange={(event) => onToggleTask(sprint.id, task.id, event.target.checked)}
              />
              <div className="flex-1 space-y-2">
                <input
                  value={task.title}
                  onChange={(e) => onUpdateTaskTitle(sprint.id, task.id, e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm ${task.status === 'completed' ? 'border-emerald-200 text-slate-500 line-through' : 'border-slate-200 text-slate-800'}`}
                />
                {task.completedAt && (
                  <p className="flex items-center gap-1 text-xs text-emerald-700">
                    <Clock3 size={12} /> اكتملت في {new Date(task.completedAt).toLocaleString('ar')}
                  </p>
                )}
                <textarea
                  value={task.note}
                  onChange={(event) => onUpdateNote(sprint.id, task.id, event.target.value)}
                  placeholder="ملاحظة المهمة"
                  className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none ring-brand-300 transition focus:ring"
                  rows={2}
                />
              </div>
              <button onClick={() => onDeleteTask(sprint.id, task.id)} className="rounded-md p-2 text-pending hover:bg-red-50" title="حذف">
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="إضافة مهمة جديدة"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          onClick={() => {
            if (newTaskTitle.trim()) {
              onAddTask(sprint.id, newTaskTitle.trim())
              setNewTaskTitle('')
            }
          }}
          className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white"
        >
          إضافة مهمة
        </button>
      </div>
    </motion.article>
  )
}
