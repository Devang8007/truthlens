import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, Video, Image as ImageIcon, FileText, History, Info, Settings, LogOut, Sparkles } from 'lucide-react';

export default function Sidebar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (setUser) setUser(null);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Video Detection', path: '/modules/video', icon: Video, badge: 'Neural' },
    { name: 'Image Analysis', path: '/modules/image', icon: ImageIcon, badge: 'ELA' },
    { name: 'News Verification', path: '/modules/news', icon: FileText, badge: 'NLP' },
    { name: 'Analysis History', path: '/history', icon: History },
    { name: 'How It Works', path: '/how-it-works', icon: Info },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-30 select-none">
      <div className="p-6 border-b border-gray-100">
        <NavLink to="/dashboard" className="flex items-center space-x-3 group">
          <div className="bg-primary p-2.5 rounded-xl shadow-xs shadow-primary/30 group-hover:scale-105 transition-transform">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-dark tracking-tight leading-tight">TruthLens</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Forensics Portal</span>
          </div>
        </NavLink>
      </div>

      <div className="px-4 py-3">
        <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-primary mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Verification Engine</span>
          </div>
          <p className="text-[11px] text-gray-500">v2.0 · Online & Synced</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-sm shadow-primary/25'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && !isActive && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1 bg-gray-50/50">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-primary text-white shadow-sm shadow-primary/25'
                : 'text-gray-600 hover:bg-gray-100 hover:text-dark'
            }`
          }
        >
          <Settings className="h-4.5 w-4.5" />
          <span>Profile & Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-danger transition-colors cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
