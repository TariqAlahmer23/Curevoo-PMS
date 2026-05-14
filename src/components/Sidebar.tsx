import { NavLink } from 'react-router-dom'
import { BarChart3, CalendarRange, LayoutDashboard, Target, Users } from 'lucide-react'

const links = [
  { to: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
  { to: '/sprints', label: 'السبرنتات', icon: Target },
  { to: '/team', label: 'الفريق', icon: Users },
  { to: '/timeline', label: 'الجدول الزمني', icon: CalendarRange },
  { to: '/statistics', label: 'الإحصائيات', icon: BarChart3 }
]

export function Sidebar() {
  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-soft lg:w-72 lg:sticky lg:top-6 lg:h-fit">
      <div className="mb-4 rounded-xl bg-white p-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="CUREVOO"
            className="h-10 w-auto sm:h-12"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
            }}
          />
          <div>
            <p className="text-base font-bold tracking-wide text-brand-700 sm:text-lg">Curevoo PMS</p>
            <p className="text-xs text-slate-500">نظام متابعة السبرنتات</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500">نظام تتبع سبرنتات داخلي</p>
      <nav className="mt-4 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1 lg:space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm transition ${
                isActive ? 'bg-brand-100 text-brand-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
