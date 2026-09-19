import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, Video, Image as ImageIcon, FileText, History, Info, Settings, LogOut, Sparkles, X } from 'lucide-react';

export default function Sidebar({ user: _user, setUser, isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (setUser) setUser(null);
    if (setIsOpen) setIsOpen(false);
    navigate('/login');
  };

  const handleNavClick = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
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
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-dark/60 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300 animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`w-72 sm:w-64 max-w-[85vw] bg-surface border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 select-none shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full lg:translate-x-0 pointer-events-none lg:pointer-events-auto'
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <NavLink 
            to="/dashboard" 
            onClick={handleNavClick}
            className="flex items-center space-x-2.5 sm:space-x-3 group"
          >
            <div className="bg-primary p-2 sm:p-2.5 rounded-xl shadow-xs shadow-primary/30 group-hover:scale-105 transition-transform">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black text-dark tracking-tight leading-tight">TruthLens</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wider">Forensics Portal</span>
            </div>
          </NavLink>

          {/* Close button on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="p-1.5 rounded-lg text-gray-400 hover:text-dark hover:bg-gray-100 lg:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
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

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
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
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 shrink-0 whitespace-nowrap ml-2">
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
            onClick={handleNavClick}
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
    </>
  );
}
