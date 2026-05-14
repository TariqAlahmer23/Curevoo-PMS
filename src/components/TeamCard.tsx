import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { SprintRecord, TeamMember } from '../types'
import { memberStats } from '../utils/metrics'

type Props = {
  member: TeamMember
  sprints: SprintRecord[]
}

export function TeamCard({ member, sprints }: Props) {
  const stats = memberStats(member, sprints)

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
    >
      <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{member.role}</p>
      <p className="mt-2 text-xs text-slate-500">{member.responsibility}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-slate-100 p-2">
          <p className="text-slate-500">المهام</p>
          <p className="text-sm font-semibold text-slate-900">{stats.assignedTasks}</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-2">
          <p className="text-emerald-700">المكتمل</p>
          <p className="text-sm font-semibold text-emerald-800">{stats.completedTasks}</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-2">
          <p className="text-amber-700">التقدم</p>
          <p className="text-sm font-semibold text-amber-800">{stats.progress}%</p>
        </div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-brand-600" style={{ width: `${stats.progress}%` }} />
      </div>
      {stats.completedTasks === stats.assignedTasks && stats.assignedTasks > 0 && (
        <p className="mt-3 flex items-center gap-1 text-xs text-emerald-700">
          <CheckCircle2 size={14} /> تم إنجاز جميع المهام
        </p>
      )}
    </motion.article>
  )
}
