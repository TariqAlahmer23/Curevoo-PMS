import { useEffect, useState } from 'react'
import type { SprintRecord } from '../types'
import { createDefaultState, loadSprintState, saveSprintState } from './storage'

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const useSprintStore = () => {
  const [sprints, setSprints] = useState<SprintRecord[]>(() => loadSprintState())

  useEffect(() => {
    saveSprintState(sprints)
  }, [sprints])

  const toggleTask = (sprintId: string, taskId: string, completed: boolean) => {
    setSprints((prev) =>
      prev.map((sprint) => {
        if (sprint.id !== sprintId) return sprint
        return {
          ...sprint,
          tasks: sprint.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: completed ? 'completed' : 'pending',
                  completedAt: completed ? new Date().toISOString() : null
                }
              : task
          )
        }
      })
    )
  }

  const updateNote = (sprintId: string, taskId: string, note: string) => {
    setSprints((prev) =>
      prev.map((sprint) =>
        sprint.id === sprintId
          ? { ...sprint, tasks: sprint.tasks.map((task) => (task.id === taskId ? { ...task, note } : task)) }
          : sprint
      )
    )
  }

  const updateTaskTitle = (sprintId: string, taskId: string, title: string) => {
    setSprints((prev) =>
      prev.map((sprint) =>
        sprint.id === sprintId
          ? { ...sprint, tasks: sprint.tasks.map((task) => (task.id === taskId ? { ...task, title } : task)) }
          : sprint
      )
    )
  }

  const addTask = (sprintId: string, title: string) => {
    setSprints((prev) =>
      prev.map((sprint) => {
        if (sprint.id !== sprintId) return sprint
        const owner = sprint.assignedTo[0] ?? ''
        return {
          ...sprint,
          tasks: [
            ...sprint.tasks,
            {
              id: `task-${makeId()}`,
              title,
              assignedTo: owner,
              status: 'pending',
              completedAt: null,
              note: ''
            }
          ]
        }
      })
    )
  }

  const deleteTask = (sprintId: string, taskId: string) => {
    setSprints((prev) => prev.map((sprint) => (sprint.id === sprintId ? { ...sprint, tasks: sprint.tasks.filter((task) => task.id !== taskId) } : sprint)))
  }

  const addSprint = () => {
    setSprints((prev) => [
      {
        id: `sprint-${makeId()}`,
        title: 'سبرنت جديد',
        phase: 'مرحلة جديدة',
        goal: 'هدف السبرنت',
        track: 'backend',
        assignedTo: ['osama-ratla'],
        tasks: []
      },
      ...prev
    ])
  }

  const updateSprint = (sprintId: string, updates: Partial<Pick<SprintRecord, 'title' | 'goal' | 'track'>>) => {
    setSprints((prev) => prev.map((sprint) => (sprint.id === sprintId ? { ...sprint, ...updates } : sprint)))
  }

  const resetState = () => setSprints(createDefaultState())

  return {
    sprints,
    toggleTask,
    updateNote,
    updateTaskTitle,
    addTask,
    deleteTask,
    addSprint,
    updateSprint,
    resetState
  }
}
