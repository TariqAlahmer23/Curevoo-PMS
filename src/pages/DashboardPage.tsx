import { Activity, CheckCircle2, CircleDashed, ListTodo, Target } from 'lucide-react'
import type { SprintRecord, TeamMember } from '../types'
import { trackLabels } from '../data/theme'
import { StatCard } from '../components/StatCard'
import { TeamCard } from '../components/TeamCard'
import { aggregateStats, currentSprint, latestCompletedTasks, trackStats } from '../utils/metrics'

type Props = {
  sprints: SprintRecord[]
  members: TeamMember[]
}

export function DashboardPage({ sprints, members }: Props) {
  const stats = aggregateStats(sprints)
  const activeSprint = currentSprint(sprints)
  const latestDone = latestCompletedTasks(sprints)

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="إجمالي السبرنتات" value={stats.totalSprints} icon={Target} />
        <StatCard label="إجمالي المهام" value={stats.totalTasks} icon={ListTodo} />
        <StatCard label="المهام المكتملة" value={stats.completedTasks} icon={CheckCircle2} />
        <StatCard label="المهام المتبقية" value={stats.pendingTasks} icon={CircleDashed} />
        <StatCard label="التقدم العام" value={`${stats.overallProgress}%`} icon={Activity} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-xs tracking-wide text-slate-500">السبرنت الحالي</p>
          {activeSprint ? (
            <>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{activeSprint.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{activeSprint.goal}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-600">لا توجد بيانات سبرنت حالياً.</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-base font-semibold text-slate-900">التقدم حسب المسار</h3>
          <div className="mt-3 space-y-3">
            {(['backend', 'frontend', 'ai', 'deployment'] as const).map((track) => {
              const tr = trackStats(track, sprints)
              return (
                <div key={track}>
                  <div className="mb-1 flex justify-between text-xs text-slate-600">
                    <span>{trackLabels[track]}</span>
                    <span>{tr.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${tr.progress}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">الفريق</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <TeamCard key={member.id} member={member} sprints={sprints} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h3 className="text-base font-semibold text-slate-900">آخر المهام المكتملة</h3>
        {latestDone.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">لا توجد مهام مكتملة بعد.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {latestDone.map(({ task, sprint }) => (
              <li key={task.id} className="rounded-md bg-slate-50 px-3 py-2">
                {task.title} - {sprint.title}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
