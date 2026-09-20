import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import VideoModule from './pages/Modules/VideoModule';
import ImageModule from './pages/Modules/ImageModule';
import NewsModule from './pages/Modules/NewsModule';
import AnalysisResult from './pages/History/AnalysisResult';
import History from './pages/History/History';
import Settings from './pages/Settings/Settings';
import DashboardLayout from './components/DashboardLayout';
import api from './api';
import { Loader2 } from 'lucide-react';
import HowItWorks from './pages/HowItWorks';

// Protected Route Component
function ProtectedRoute({ user, setUser, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <DashboardLayout user={user} setUser={setUser}>{children}</DashboardLayout>;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Auth verification failed', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Initializing TruthLens Engine...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-dark font-sans selection:bg-primary/20">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar user={user} setUser={setUser} /><Home /></>} />
          <Route path="/how-it-works" element={<><Navbar user={user} setUser={setUser} /><HowItWorks /></>} />
          <Route path="/login" element={!user ? <><Navbar user={user} setUser={setUser} /><Login setUser={setUser} /></> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <><Navbar user={user} setUser={setUser} /><Register setUser={setUser} /></> : <Navigate to="/dashboard" />} />
          
          {/* Authenticated Routes */}
          <Route path="/dashboard" element={<ProtectedRoute user={user} setUser={setUser}><Dashboard user={user} /></ProtectedRoute>} />
          <Route path="/modules/video" element={<ProtectedRoute user={user} setUser={setUser}><VideoModule /></ProtectedRoute>} />
          <Route path="/modules/image" element={<ProtectedRoute user={user} setUser={setUser}><ImageModule /></ProtectedRoute>} />
          <Route path="/modules/news" element={<ProtectedRoute user={user} setUser={setUser}><NewsModule /></ProtectedRoute>} />
          <Route path="/detection" element={<Navigate to="/modules/video" replace />} />
          <Route path="/modules" element={<Navigate to="/modules/video" replace />} />
          <Route path="/results" element={<ProtectedRoute user={user} setUser={setUser}><AnalysisResult /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute user={user} setUser={setUser}><History /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute user={user} setUser={setUser}><Settings user={user} setUser={setUser} /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
