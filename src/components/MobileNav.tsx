import { NavLink } from 'react-router-dom';
import { Home, Users, Sparkles, Heart, GraduationCap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: '客厅' },
  { path: '/family', icon: Users, label: '家庭' },
  { path: '/grow', icon: Sparkles, label: '养成' },
  { path: '/understand', icon: Heart, label: '理解' },
  { path: '/advisor', icon: GraduationCap, label: '专家' },
  { path: '/settings', icon: Settings, label: '设置' },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-100 px-2 py-2 z-50 lg:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]',
                isActive
                  ? 'text-warm-500'
                  : 'text-text-muted hover:text-text-primary'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}