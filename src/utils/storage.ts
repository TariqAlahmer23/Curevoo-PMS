import { sprintSeeds } from '../data/roadmap'
import type { SprintRecord, TaskRecord } from '../types'

const STORAGE_KEY = 'curevoo-sprintflow-state-v2'

const taskFromSeed = (task: TaskRecord): TaskRecord => ({
  ...task,
  status: task.status === 'completed' ? 'completed' : 'pending',
  completedAt: task.completedAt ?? null,
  note: task.note ?? ''
})

const sprintFromSeed = (sprint: SprintRecord): SprintRecord => ({
  ...sprint,
  tasks: sprint.tasks.map(taskFromSeed)
})

export const createDefaultState = (): SprintRecord[] => sprintSeeds.map(sprintFromSeed)

const normalize = (input: SprintRecord[]): SprintRecord[] =>
  input.map((sprint) => ({
    ...sprint,
    assignedTo: Array.isArray(sprint.assignedTo) ? sprint.assignedTo : [],
    tasks: Array.isArray(sprint.tasks)
      ? sprint.tasks.map((task) => ({
          ...task,
          assignedTo: task.assignedTo ?? sprint.assignedTo[0] ?? '',
          status: task.status === 'completed' ? 'completed' : 'pending',
          completedAt: task.status === 'completed' ? task.completedAt ?? new Date().toISOString() : null,
          note: task.note ?? ''
        }))
      : []
  }))

export const loadSprintState = (): SprintRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createDefaultState()
    const parsed = JSON.parse(raw) as SprintRecord[]
    if (!Array.isArray(parsed)) return createDefaultState()
    return normalize(parsed)
  } catch {
    return createDefaultState()
  }
}

export const saveSprintState = (state: SprintRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}