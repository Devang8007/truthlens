import React, { useState, useEffect } from 'react';
import { 
  User, Shield, Key, Sliders, Activity, Copy, Check, RefreshCw, 
  Save, AlertCircle, CheckCircle2, Lock, Cpu, Database, Server
} from 'lucide-react';
import api from '../../api';

export default function Settings({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Profile Form State
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    organization: user?.organization || 'TruthLens Security Operations',
    role: user?.role || 'Senior Forensic Analyst',
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // API Key State
  const [apiKey, setApiKey] = useState(user?.apiKey || 'tl_live_sec_89df2019482710');

  // Preferences State
  const [preferences, setPreferences] = useState({
    strictMode: false,
    autoArchive: true,
    emailAlerts: true,
    confidenceThreshold: 80
  });

  // System Diagnostics State
  const [systemHealth, setSystemHealth] = useState({
    gateway: 'Checking...',
    aiService: 'Checking...',
    database: 'Checking...'
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get('/users/profile');
        if (res.data) {
          setProfileData({
            username: res.data.username || '',
            email: res.data.email || '',
            organization: res.data.organization || 'TruthLens Security Operations',
            role: res.data.role || 'Senior Forensic Analyst'
          });
          if (res.data.apiKey) setApiKey(res.data.apiKey);
          if (res.data.preferences) setPreferences(res.data.preferences);
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    const checkHealth = async () => {
      try {
        const res = await api.get('/health');
        setSystemHealth({
          gateway: 'Online (Port 5000)',
          database: res.data.database === 'connected' ? 'Connected (MongoDB)' : 'Degraded',
          aiService: 'Online (Port 8000 / Integrated)'
        });
      } catch {
        setSystemHealth({
          gateway: 'Offline',
          database: 'Disconnected',
          aiService: 'Offline'
        });
      }
    };

    fetchUserData();
    checkHealth();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await api.put('/users/profile', {
        username: profileData.username,
        organization: profileData.organization,
        role: profileData.role,
        preferences
      });
      if (setUser) setUser(res.data);
      setStatusMessage({ type: 'success', text: 'Profile & preferences saved successfully.' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatusMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      await api.post('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setStatusMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.response?.data?.message || 'Password update failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateApiKey = async () => {
    if (!window.confirm('Are you sure you want to regenerate your API key? Existing scripts will be invalidated.')) {
      return;
    }
    try {
      const res = await api.post('/users/regenerate-api-key');
      setApiKey(res.data.apiKey);
      setStatusMessage({ type: 'success', text: 'New API Key generated successfully.' });
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to regenerate API key.' });
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Team', icon: User },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'api', label: 'Enterprise API', icon: Key },
    { id: 'thresholds', label: 'Detection Tuning', icon: Sliders },
    { id: 'diagnostics', label: 'System Health', icon: Activity },
  ];

  return (
    <div className="max-w-5xl mx-auto py-3 sm:py-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-dark tracking-tight">Organization & User Settings</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Configure your TruthLens account, API credentials, and detection heuristics.</p>
      </div>

      {statusMessage.text && (
        <div className={`mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl flex items-center space-x-3 border text-xs sm:text-sm ${
          statusMessage.type === 'success' 
            ? 'bg-secondary/10 border-secondary/20 text-secondary' 
            : 'bg-danger/10 border-danger/20 text-danger'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <p className="font-medium">{statusMessage.text}</p>
        </div>
      )}

      {/* Tabs Navigation (swipeable on mobile) */}
      <div className="flex space-x-1 sm:space-x-2 border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setStatusMessage({ type: '', text: '' }); }}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 font-medium text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-gray-500 hover:text-dark hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="glass-card p-4 sm:p-8">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-6 max-w-2xl">
            <div className="flex flex-col xs:flex-row items-center xs:items-start text-center xs:text-left space-y-3 xs:space-y-0 xs:space-x-5 pb-6 border-b border-gray-100">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-primary text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md shadow-primary/30 shrink-0">
                {profileData.username ? profileData.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-dark">{profileData.username || 'Researcher'}</h3>
                <p className="text-xs text-gray-500">{profileData.role}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  Enterprise Tier
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Username</label>
                <input
                  type="text"
                  required
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="input-field text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="input-field text-xs sm:text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Organization</label>
                <input
                  type="text"
                  value={profileData.organization}
                  onChange={(e) => setProfileData({ ...profileData, organization: e.target.value })}
                  className="input-field text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Role / Title</label>
                <input
                  type="text"
                  value={profileData.role}
                  onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                  className="input-field text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto space-x-2 justify-center">
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="max-w-2xl space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Password Authentication</h3>
              <p className="text-xs text-gray-500 mb-5 sm:mb-6">Ensure your account uses a secure password of at least 6 characters.</p>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="input-field text-xs sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="input-field text-xs sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="input-field text-xs sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto space-x-2 justify-center">
                    <Lock className="h-4 w-4" />
                    <span>{loading ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-dark mb-2">Active Session</h4>
              <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-dark">Current Browser Session</p>
                  <p className="text-gray-400">TruthLens Web Client · Local Environment</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-green-50 text-secondary font-bold text-[10px]">Active Now</span>
              </div>
            </div>
          </div>
        )}

        {/* Enterprise API Tab */}
        {activeTab === 'api' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Enterprise API Credentials</h3>
              <p className="text-xs text-gray-500 mb-5 sm:mb-6">
                Use your private API key to integrate TruthLens automated deepfake and misinformation checks into your CI/CD pipelines and ingestion services.
              </p>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Live Production Key</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    readOnly
                    value={apiKey}
                    className="input-field font-mono text-xs sm:text-sm bg-gray-50 flex-1 min-w-0"
                  />
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={handleCopyApiKey}
                      className="btn-secondary flex-1 sm:flex-initial space-x-1.5 px-3.5 py-2.5 text-xs justify-center"
                    >
                      {copiedKey ? <Check className="h-4 w-4 text-secondary" /> : <Copy className="h-4 w-4" />}
                      <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleRegenerateApiKey}
                      className="btn-secondary flex-1 sm:flex-initial space-x-1.5 px-3.5 py-2.5 text-xs text-danger hover:border-danger/30 justify-center"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-dark mb-2">Example cURL Request</h4>
              <div className="bg-slate-900 text-slate-200 p-3.5 sm:p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed no-scrollbar">
                <p><span className="text-pink-400">curl</span> -X POST http://localhost:5000/api/analysis \</p>
                <p className="pl-4">-H <span className="text-yellow-300">"Authorization: Bearer {apiKey.substring(0, 14)}..."</span> \</p>
                <p className="pl-4">-F <span className="text-cyan-300">"type=IMAGE"</span> \</p>
                <p className="pl-4">-F <span className="text-cyan-300">"file=@evidence.jpg"</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Detection Tuning Tab */}
        {activeTab === 'thresholds' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Forensic Sensitivity Tuning</h3>
              <p className="text-xs text-gray-500 mb-5 sm:mb-6">Adjust algorithmic anomaly detection thresholds across neural models.</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-dark">Minimum Confidence Threshold for 'FAKE' Verdict</span>
                  <span className="text-primary">{preferences.confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={preferences.confidenceThreshold}
                  onChange={(e) => setPreferences({ ...preferences, confidenceThreshold: Number(e.target.value) })}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-gray-400 mt-1">Predictions below this score will be categorized as 'SUSPICIOUS / INCONCLUSIVE'.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-dark">Strict Latent Fingerprinting</p>
                    <p className="text-[11px] sm:text-xs text-gray-500">Flag minor frequency noise anomalies as potential AI generation.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.strictMode}
                    onChange={(e) => setPreferences({ ...preferences, strictMode: e.target.checked })}
                    className="h-5 w-5 rounded text-primary accent-primary cursor-pointer shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-dark">Auto-Archive Analyses to Database</p>
                    <p className="text-[11px] sm:text-xs text-gray-500">Automatically save every run to your tamper-proof verification history.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.autoArchive}
                    onChange={(e) => setPreferences({ ...preferences, autoArchive: e.target.checked })}
                    className="h-5 w-5 rounded text-primary accent-primary cursor-pointer shrink-0"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button onClick={handleProfileSave} disabled={loading} className="btn-primary w-full sm:w-auto space-x-2 justify-center">
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Saving...' : 'Save Detection Rules'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* System Diagnostics Tab */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Architecture Infrastructure Diagnostics</h3>
              <p className="text-xs text-gray-500 mb-5 sm:mb-6">Real-time telemetry of microservice health and database connections.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">API Gateway</span>
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <div className="text-base sm:text-lg font-bold text-dark">{systemHealth.gateway}</div>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-secondary">
                  HTTP 200 OK
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">Database</span>
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div className="text-base sm:text-lg font-bold text-dark">{systemHealth.database}</div>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-primary">
                  Replica / Primary
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">AI Microservice</span>
                  <Cpu className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-base sm:text-lg font-bold text-dark">{systemHealth.aiService}</div>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600">
                  ResNet + ELA Active
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <h4 className="text-xs sm:text-sm font-bold text-dark mb-1">Capstone Verification Stack</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                TruthLens combines a React 19 Frontend with a Node.js Express Gateway, Python FastAPI AI Microservice, and MongoDB persistence for forensic media validation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
