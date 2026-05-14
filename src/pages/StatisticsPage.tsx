import type { SprintRecord, TeamMember } from '../types'
import { aggregateStats, memberStats, sprintProgress, trackStats } from '../utils/metrics'
import { trackLabels } from '../data/theme'

type Props = {
  sprints: SprintRecord[]
  members: TeamMember[]
}

export function StatisticsPage({ sprints, members }: Props) {
  const overall = aggregateStats(sprints)

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">نسبة الإنجاز الكلية</h2>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand-600" style={{ width: `${overall.overallProgress}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate-600">{overall.overallProgress}% ({overall.completedTasks}/{overall.totalTasks})</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">التقدم حسب المسار</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(['backend', 'frontend', 'ai', 'deployment'] as const).map((track) => {
            const t = trackStats(track, sprints)
            return (
              <div key={track} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <p className="font-medium">{trackLabels[track]}</p>
                <p>المهام: {t.tasks}</p>
                <p>المكتمل: {t.completed}</p>
                <p>غير المكتمل: {t.pending}</p>
                <p>التقدم: {t.progress}%</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">إحصائيات الأعضاء</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-right text-slate-500">
                <th className="pb-2">العضو</th>
                <th className="pb-2">المهام</th>
                <th className="pb-2">المكتمل</th>
                <th className="pb-2">غير المكتمل</th>
                <th className="pb-2">التقدم</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const stats = memberStats(member, sprints)
                return (
                  <tr key={member.id} className="border-b border-slate-100 text-slate-700">
                    <td className="py-2">{member.name}</td>
                    <td className="py-2">{stats.assignedTasks}</td>
                    <td className="py-2">{stats.completedTasks}</td>
                    <td className="py-2">{stats.pendingTasks}</td>
                    <td className="py-2">{stats.progress}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">قائمة اكتمال السبرنتات</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {sprints.map((sprint) => (
            <li key={sprint.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {sprint.title}: {sprintProgress(sprint)}%
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
