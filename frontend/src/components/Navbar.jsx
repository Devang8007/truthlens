import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';

export default function Navbar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (setUser) setUser(null);
    navigate('/login');
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 py-3.5 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="bg-primary p-2 rounded-xl shadow-xs shadow-primary/30">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-dark tracking-tight leading-none">TruthLens</span>
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest mt-0.5">Enterprise AI</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Features</a>
            <a href="/#technology" onClick={(e) => scrollToSection(e, 'technology')} className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Technology</a>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">How It Works</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/15 transition-all"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
                  <div className="h-8 w-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button 
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-1.5 text-gray-400 hover:text-danger rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Log In</Link>
                <Link to="/register" className="btn-primary rounded-full px-5 py-2 text-sm">Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
