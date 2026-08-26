import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Navbar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
      // Slight delay to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-dark tracking-wide">TruthLens</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-600 hover:text-primary transition-colors font-medium">Features</a>
            <a href="/#technology" onClick={(e) => scrollToSection(e, 'technology')} className="text-gray-600 hover:text-primary transition-colors font-medium">Technology</a>
            <a href="/#research" onClick={(e) => scrollToSection(e, 'research')} className="text-gray-600 hover:text-primary transition-colors font-medium">Research</a>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors font-medium">How It Works</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-primary transition-colors font-medium">Log In</Link>
            <Link to="/register" className="btn-primary rounded-full px-6 py-2.5">Get Started Free</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
