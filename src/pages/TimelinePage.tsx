import { motion } from 'framer-motion'
import type { SprintRecord, TeamMember } from '../types'
import { sprintProgress } from '../utils/metrics'
import { trackLabels } from '../data/theme'

type Props = {
  sprints: SprintRecord[]
  members: TeamMember[]
}

export function TimelinePage({ sprints, members }: Props) {
  return (
    <div className="space-y-4">
      {sprints.map((sprint, index) => {
        const progress = sprintProgress(sprint)
        const status = progress === 100 ? 'مكتمل' : progress > 0 ? 'قيد التنفيذ' : 'غير مكتمل'
        const assigned = sprint.assignedTo.map((id) => members.find((m) => m.id === id)?.name).filter(Boolean).join('، ')

        return (
          <motion.div
            key={sprint.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="relative rounded-2xl border border-slate-200 bg-white p-4 pr-8 shadow-soft"
          >
            <span className="absolute right-3 top-5 h-3 w-3 rounded-full bg-brand-600" />
            <p className="text-xs font-semibold text-brand-700">{trackLabels[sprint.track]}</p>
            <h3 className="text-base font-semibold text-slate-900">{sprint.title}</h3>
            <p className="mt-1 text-sm text-slate-600">المسؤول: {assigned}</p>
            <span
              className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                status === 'مكتمل'
                  ? 'bg-emerald-100 text-emerald-700'
                  : status === 'قيد التنفيذ'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {status}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
