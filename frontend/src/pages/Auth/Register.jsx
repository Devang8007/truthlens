import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import api from '../../api';

export default function Register({ setUser }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-3.5 sm:px-4 py-8 bg-background">
      <div className="glass-card w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <div className="p-3 bg-secondary/10 rounded-2xl text-secondary mb-3 sm:mb-4 shadow-xs">
            <Shield className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark">Create an account</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Join TruthLens to start verifying media</p>
        </div>

        {error && (
          <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 bg-danger/10 border border-danger/20 rounded-xl flex items-center text-danger text-xs sm:text-sm">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-dark mb-1.5 sm:mb-2">Username</label>
            <input
              type="text"
              name="username"
              required
              className="input-field"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-dark mb-1.5 sm:mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="input-field"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-dark mb-1.5 sm:mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                minLength="6"
                className="input-field pr-11"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-dark focus:outline-none transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center h-11 sm:h-12 text-sm sm:text-base font-semibold"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="mt-5 sm:mt-6 text-center text-gray-500 text-xs sm:text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary hover:text-green-600 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
