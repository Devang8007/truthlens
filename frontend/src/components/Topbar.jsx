import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export default function Topbar({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/history?search=${encodeURIComponent(searchTerm.trim())}`);
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
    <header className="h-18 bg-surface border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search past analyses or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </form>
      </div>

      <div className="flex items-center space-x-5">
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
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-dark uppercase tracking-wider">System Alerts</span>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-dark p-1 rounded-md"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="p-3.5 hover:bg-gray-50 transition-colors flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${n.color} shrink-0`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-dark">{n.title}</p>
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

        {/* User Profile Info */}
        <Link 
          to="/settings" 
          className="flex items-center space-x-3 border-l border-gray-200 pl-5 hover:opacity-80 transition-opacity"
        >
          <div className="h-9 w-9 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center shadow-xs shadow-primary/30">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-dark leading-none">{user?.username || 'Analyst'}</p>
            <p className="text-[11px] text-gray-400 mt-1">{user?.role || 'Senior Researcher'}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
