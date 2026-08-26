import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Topbar({ user }) {
  return (
    <header className="h-20 bg-surface border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search analyses..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-dark transition-colors relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-danger rounded-full border-2 border-surface"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-dark">{user?.username || 'User'}</p>
            <p className="text-xs text-gray-500">Researcher</p>
          </div>
        </div>
      </div>
    </header>
  );
}
