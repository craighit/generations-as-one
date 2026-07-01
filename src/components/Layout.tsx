import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useUIStore } from '@/store';
import { cn } from '@/lib/utils';

export default function Layout() {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-soft-gray">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0',
          'pb-20 lg:pb-0' // Space for mobile nav
        )}
      >
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}