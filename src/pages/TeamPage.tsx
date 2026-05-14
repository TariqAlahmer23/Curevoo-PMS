import type { SprintRecord, TeamMember } from '../types'
import { TeamCard } from '../components/TeamCard'

type Props = {
  members: TeamMember[]
  sprints: SprintRecord[]
}

export function TeamPage({ members, sprints }: Props) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-slate-900">أعضاء الفريق</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} sprints={sprints} />
        ))}
      </div>
    </div>
  )
}
