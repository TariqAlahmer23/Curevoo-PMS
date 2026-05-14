import { Navigate, Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { teamMembers } from './data/roadmap'
import { DashboardPage } from './pages/DashboardPage'
import { SprintsPage } from './pages/SprintsPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { TeamPage } from './pages/TeamPage'
import { TimelinePage } from './pages/TimelinePage'
import { useSprintStore } from './utils/useSprintStore'

function App() {
  const { sprints, toggleTask, updateNote, updateTaskTitle, addTask, deleteTask, addSprint, updateSprint, resetState } = useSprintStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mx-auto min-h-screen max-w-7xl px-4 py-6 lg:px-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <Sidebar />
        <main className="flex-1 space-y-4">
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-soft"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">CUREVOO SprintFlow</h2>
                <p className="text-sm text-slate-600">أداة داخلية خفيفة لإدارة السبرنتات</p>
              </div>
              <button onClick={resetState} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
                <RotateCcw size={14} /> استعادة بيانات البداية
              </button>
            </div>
          </motion.header>

          <Routes>
            <Route path="/" element={<DashboardPage sprints={sprints} members={teamMembers} />} />
            <Route
              path="/sprints"
              element={
                <SprintsPage
                  sprints={sprints}
                  members={teamMembers}
                  onToggleTask={toggleTask}
                  onUpdateNote={updateNote}
                  onUpdateTaskTitle={updateTaskTitle}
                  onDeleteTask={deleteTask}
                  onAddTask={addTask}
                  onAddSprint={addSprint}
                  onUpdateSprint={updateSprint}
                />
              }
            />
            <Route path="/team" element={<TeamPage sprints={sprints} members={teamMembers} />} />
            <Route path="/timeline" element={<TimelinePage sprints={sprints} members={teamMembers} />} />
            <Route path="/statistics" element={<StatisticsPage sprints={sprints} members={teamMembers} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </motion.div>
  )
}

export default App
