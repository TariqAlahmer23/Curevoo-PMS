import type { SprintRecord, TeamMember, TrackType } from '../types'

export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export const sprintProgress = (sprint: SprintRecord): number => {
  const completed = sprint.tasks.filter((task) => task.status === 'completed').length
  return percentage(completed, sprint.tasks.length)
}

export const aggregateStats = (sprints: SprintRecord[]) => {
  const totalSprints = sprints.length
  const totalTasks = sprints.reduce((sum, sprint) => sum + sprint.tasks.length, 0)
  const completedTasks = sprints.reduce((sum, sprint) => sum + sprint.tasks.filter((task) => task.status === 'completed').length, 0)

  return {
    totalSprints,
    totalTasks,
    completedTasks,
    pendingTasks: totalTasks - completedTasks,
    overallProgress: percentage(completedTasks, totalTasks)
  }
}

export const memberStats = (member: TeamMember, sprints: SprintRecord[]) => {
  const assignedTasks = sprints.flatMap((sprint) => sprint.tasks.filter((task) => task.assignedTo === member.id))
  const completedTasks = assignedTasks.filter((task) => task.status === 'completed').length

  return {
    assignedTasks: assignedTasks.length,
    completedTasks,
    pendingTasks: assignedTasks.length - completedTasks,
    progress: percentage(completedTasks, assignedTasks.length)
  }
}

export const trackStats = (track: TrackType, sprints: SprintRecord[]) => {
  const trackSprints = sprints.filter((sprint) => sprint.track === track)
  const tasks = trackSprints.flatMap((sprint) => sprint.tasks)
  const completed = tasks.filter((task) => task.status === 'completed').length

  return {
    sprints: trackSprints.length,
    tasks: tasks.length,
    completed,
    pending: tasks.length - completed,
    progress: percentage(completed, tasks.length)
  }
}

export const currentSprint = (sprints: SprintRecord[]): SprintRecord | null =>
  sprints.find((sprint) => sprint.tasks.some((task) => task.status !== 'completed')) ?? sprints.at(-1) ?? null

export const latestCompletedTasks = (sprints: SprintRecord[]) =>
  sprints
    .flatMap((sprint) => sprint.tasks.map((task) => ({ task, sprint })))
    .filter((item) => item.task.status === 'completed' && item.task.completedAt)
    .sort((a, b) => (b.task.completedAt ?? '').localeCompare(a.task.completedAt ?? ''))
    .slice(0, 6)