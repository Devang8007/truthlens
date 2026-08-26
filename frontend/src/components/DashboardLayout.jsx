import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, user, setUser }) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar user={user} setUser={setUser} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar user={user} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
