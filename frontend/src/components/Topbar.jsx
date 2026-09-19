import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, CheckCircle2, AlertTriangle, ShieldCheck, X, Menu, Shield } from 'lucide-react';

export default function Topbar({ user, onMenuToggle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/history?search=${encodeURIComponent(searchTerm.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Forensics Engine v2.0 Synced',
      desc: 'ELA and ResNet-50 models active.',
      time: 'Just now',
      icon: ShieldCheck,
      color: 'text-secondary bg-secondary/10'
    },
    {
      id: 2,
      title: 'Misinformation Alert',
      desc: 'Viral claim flagged as FAKE across 12 wire checks.',
      time: '1h ago',
      icon: AlertTriangle,
      color: 'text-warning bg-warning/10'
    },
    {
      id: 3,
      title: 'Database Synced',
      desc: 'MongoDB verification cluster connected.',
      time: '3h ago',
      icon: CheckCircle2,
      color: 'text-primary bg-primary/10'
    }
  ];

  return (
    <header className="h-16 sm:h-18 bg-surface border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 lg:px-8 sticky top-0 z-30">
      {/* Left: Mobile Drawer Trigger + Brand Logo */}
      <div className="flex items-center space-x-2 shrink-0">
        <button
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 -ml-1 rounded-xl text-gray-600 hover:text-dark hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/dashboard" className="lg:hidden flex items-center space-x-1.5 shrink-0">
          <div className="bg-primary p-1.5 rounded-lg text-white shadow-xs">
            <Shield className="h-4 w-4" />
          </div>
          <span className="font-extrabold text-sm sm:text-base text-dark tracking-tight">TruthLens</span>
        </Link>
      </div>

      {/* Center: Desktop Search Input */}
      <div className="hidden sm:flex flex-1 max-w-xs md:max-w-md mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search past analyses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </form>
      </div>

      {/* Right Actions: Mobile Search Toggle + Notifications + Profile */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
        {/* Mobile Search Button (< sm) */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          aria-label="Search"
          className="sm:hidden p-2 rounded-xl text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="text-gray-500 hover:text-dark p-2 rounded-xl hover:bg-gray-100 transition-colors relative cursor-pointer"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-1rem)] max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-dark uppercase tracking-wider">System Alerts</span>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-dark p-1 rounded-md"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto no-scrollbar">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="p-3 hover:bg-gray-50 transition-colors flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${n.color} shrink-0`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-dark truncate">{n.title}</p>
                        <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <Link 
          to="/settings" 
          className="flex items-center space-x-2 pl-1 sm:pl-3 border-l border-gray-200 hover:opacity-80 transition-opacity"
        >
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs shadow-primary/30 shrink-0">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-dark leading-none truncate max-w-[110px]">{user?.username || 'Analyst'}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[110px]">{user?.role || 'Senior Researcher'}</p>
          </div>
        </Link>
      </div>

      {/* Mobile Search Overlay (< sm) */}
      {mobileSearchOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-3 shadow-md z-30 animate-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search past analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-dark placeholder-gray-400 focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-dark"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
