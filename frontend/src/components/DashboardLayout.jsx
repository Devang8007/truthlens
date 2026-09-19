import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Video, Image as ImageIcon, FileText, History } from 'lucide-react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, user, setUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const bottomNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Video', path: '/modules/video', icon: Video },
    { name: 'Image', path: '/modules/image', icon: ImageIcon },
    { name: 'News', path: '/modules/news', icon: FileText },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <div className="min-h-screen bg-background flex w-full max-w-full overflow-x-hidden">
      {/* Desktop Sidebar & Mobile Drawer */}
      <Sidebar 
        user={user} 
        setUser={setUser} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 w-full transition-all duration-300">
        <Topbar 
          user={user} 
          onMenuToggle={() => setSidebarOpen(prev => !prev)} 
        />
        
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 min-w-0 max-w-full pb-24 lg:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (< lg) */}
        <nav 
          aria-label="Mobile Navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-1.5 py-1.5 flex items-center justify-around shadow-lg safe-area-inset-bottom"
        >
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[11px] font-bold transition-all ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                <Icon className={`h-5 w-5 mb-0.5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                <span className="leading-none">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
