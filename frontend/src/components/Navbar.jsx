import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (setUser) setUser(null);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 py-3 sm:py-3.5 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11 sm:h-12">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 sm:space-x-2.5 shrink-0"
          >
            <div className="bg-primary p-1.5 sm:p-2 rounded-xl shadow-xs shadow-primary/30">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-dark tracking-tight leading-none">TruthLens</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-primary uppercase tracking-widest mt-0.5">Enterprise AI</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Features</a>
            <a href="/#technology" onClick={(e) => scrollToSection(e, 'technology')} className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Technology</a>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">How It Works</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
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
                    className="p-1.5 text-gray-400 hover:text-danger rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
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

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden space-x-2">
            {user ? (
              <Link 
                to="/dashboard" 
                className="p-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold flex items-center space-x-1"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden xs:inline">Portal</span>
              </Link>
            ) : null}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-xl text-gray-600 hover:text-dark hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200 shadow-lg">
          <div className="flex flex-col space-y-3">
            <a 
              href="/#features" 
              onClick={(e) => scrollToSection(e, 'features')} 
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
            >
              Features
            </a>
            <a 
              href="/#technology" 
              onClick={(e) => scrollToSection(e, 'technology')} 
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
            >
              Technology
            </a>
            <Link 
              to="/how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
            >
              How It Works
            </Link>

            <div className="pt-3 border-t border-gray-100 flex flex-col space-y-2.5">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full py-2.5 text-sm flex items-center justify-center space-x-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Open Dashboard</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="btn-secondary w-full py-2.5 text-sm flex items-center justify-center space-x-2 text-danger hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out ({user.username || 'User'})</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary w-full py-2.5 text-sm flex items-center justify-center"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full py-2.5 text-sm flex items-center justify-center"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
