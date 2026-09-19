import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, user, setUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        user={user} 
        setUser={setUser} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 w-full transition-all duration-300">
        <Topbar 
          user={user} 
          onMenuToggle={() => setSidebarOpen(prev => !prev)} 
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
