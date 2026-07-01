import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  Sparkles,
  Heart,
  GraduationCap,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store';

const navItems = [
  { path: '/', icon: Home, label: '家庭客厅' },
  { path: '/family', icon: Users, label: '家庭空间' },
  { path: '/grow', icon: Sparkles, label: '角色养成' },
  { path: '/understand', icon: Heart, label: '理解工坊' },
  { path: '/advisor', icon: GraduationCap, label: '专家顾问' },
  { path: '/settings', icon: Settings, label: '设置' },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-warm-50 border-r border-warm-100 transition-all duration-300 z-40',
        sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-warm-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-warm-500 to-warm-600 flex items-center justify-center text-white font-semibold text-lg">
            G
          </div>
          <div className="sidebar-content">
            <h1 className="text-xl font-semibold text-text-primary">Generations</h1>
            <p className="text-xs text-text-muted">As One</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 sidebar-content">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-warm-500 text-white shadow-md'
                  : 'text-text-secondary hover:bg-warm-100 hover:text-text-primary'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-warm-100 rounded-full flex items-center justify-center hover:bg-warm-200 transition-colors border border-warm-200 shadow-sm"
      >
        <ChevronLeft
          className={cn('w-4 h-4 text-text-secondary transition-transform', !sidebarOpen && 'rotate-180')}
        />
      </button>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-warm-100 sidebar-content">
        <p className="text-xs text-text-muted text-center">两代同行 · 爱跨越时空</p>
      </div>
    </aside>
  );
}