import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, Video, Image as ImageIcon, FileText, History, Info, User, LogOut } from 'lucide-react';

export default function Sidebar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Video Detection', path: '/modules/video', icon: Video },
    { name: 'Image Analysis', path: '/modules/image', icon: ImageIcon },
    { name: 'News Verification', path: '/modules/news', icon: FileText },
    { name: 'Analysis History', path: '/history', icon: History },
    { name: 'How It Works', path: '/how-it-works', icon: Info },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <NavLink to="/dashboard" className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-dark tracking-wide">TruthLens</span>
        </NavLink>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-dark'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <NavLink
          to="/settings"
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-dark transition-colors"
        >
          <User className="h-5 w-5" />
          <span>Profile & Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-dark transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
