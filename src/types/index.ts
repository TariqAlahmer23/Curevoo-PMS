export type TrackType = 'backend' | 'frontend' | 'ai' | 'deployment'

export type TeamMember = {
  id: string
  name: string
  role: string
  responsibility: string
}

export type TaskRecord = {
  id: string
  title: string
  assignedTo: string
  status: 'pending' | 'completed'
  completedAt: string | null
  note: string
}

export type SprintRecord = {
  id: string
  title: string
  phase: string
  goal: string
  track: TrackType
  assignedTo: string[]
  tasks: TaskRecord[]
}