import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Video, Image as ImageIcon, FileText, ArrowRight, Database, 
  XCircle, CheckCircle2, TrendingUp, Shield, Sparkles, RefreshCw, Eye
} from 'lucide-react';
import api from '../../api';

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalAnalyzed: 0,
    fakesDetected: 0,
    authenticCount: 0,
    fakePercentage: '0.0',
    averageConfidence: '94.7',
    byType: { VIDEO: 0, IMAGE: 0, NEWS: 0 },
    recentAnalyses: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get('/analysis/stats');
      if (res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const ResultBadge = ({ prediction }) => {
    if (prediction === 'FAKE' || prediction === 'DEEPFAKE') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-red-50 text-danger border border-red-200 shrink-0">
          <XCircle className="h-3 w-3 mr-1" /> {prediction}
        </span>
      );
    }
    if (prediction === 'AUTHENTIC' || prediction === 'REAL') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-green-50 text-secondary border border-green-200 shrink-0">
          <CheckCircle2 className="h-3 w-3 mr-1" /> AUTHENTIC
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-50 text-warning border border-amber-200 shrink-0">
        MISLEADING
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-1 sm:py-4">
      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-bold mb-1.5 sm:mb-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>Forensic Operations Command</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-dark tracking-tight">
            Welcome back, {user?.username || 'Investigator'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Real-time media verification metrics and deep learning analysis pipelines.
          </p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
          <button 
            onClick={fetchStats}
            className="btn-secondary flex-1 sm:flex-initial text-xs px-3 py-2 space-x-1.5 justify-center"
            title="Refresh Analytics"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Stats</span>
          </button>
          <Link to="/history" className="btn-secondary flex-1 sm:flex-initial text-xs px-3.5 py-2 justify-center">
            Audit Archive
          </Link>
        </div>
      </div>

      {/* Module Quick Launch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 mb-6 sm:mb-10">
        {/* Video Module */}
        <Link 
          to="/modules/video" 
          className="group glass-card-hover p-4 sm:p-6 flex flex-col h-full hover:border-primary/50 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <div className="p-2.5 sm:p-3 bg-primary/10 rounded-2xl text-primary w-fit shadow-xs">
              <Video className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Neural Face Tracker
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors">
            Deepfake Video Detection
          </h2>
          <p className="text-gray-500 text-xs mb-4 sm:mb-6 flex-grow leading-relaxed">
            Upload footage for temporal landmark jitter, audio viseme desync, and GAN artifact scanning.
          </p>
          <div className="flex items-center text-primary font-bold text-xs group-hover:translate-x-1 transition-transform">
            <span>Launch Video Scanner</span> <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </div>
        </Link>

        {/* Image Module */}
        <Link 
          to="/modules/image" 
          className="group glass-card-hover p-4 sm:p-6 flex flex-col h-full hover:border-purple-300 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <div className="p-2.5 sm:p-3 bg-purple-50 rounded-2xl text-purple-600 w-fit shadow-xs">
              <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              ELA + Diffusion
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-dark mb-1 group-hover:text-purple-600 transition-colors">
            AI Image Forensics
          </h2>
          <p className="text-gray-500 text-xs mb-4 sm:mb-6 flex-grow leading-relaxed">
            Inspect photos with Error Level Analysis (ELA) and identify Midjourney or Stable Diffusion latent fingerprints.
          </p>
          <div className="flex items-center text-purple-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
            <span>Launch Image Scanner</span> <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </div>
        </Link>

        {/* News Module */}
        <Link 
          to="/modules/news" 
          className="group glass-card-hover p-4 sm:p-6 flex flex-col h-full hover:border-blue-300 relative overflow-hidden sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <div className="p-2.5 sm:p-3 bg-blue-50 rounded-2xl text-blue-600 w-fit shadow-xs">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              NLP Fact Check
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-dark mb-1 group-hover:text-blue-600 transition-colors">
            Fake News Verification
          </h2>
          <p className="text-gray-500 text-xs mb-4 sm:mb-6 flex-grow leading-relaxed">
            Cross-reference claim excerpts against 50+ wire agencies and calculate sensationalism & bias indicators.
          </p>
          <div className="flex items-center text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
            <span>Launch Fact-Checker</span> <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </div>
        </Link>
      </div>

      {/* Analytics KPI Stat Cards (2x2 on mobile, 4 columns on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-6 sm:mb-10">
        <div className="glass-card p-3 sm:p-5">
          <div className="flex items-center justify-between mb-1.5 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate pr-1">Total Scans</span>
            <div className="p-1.5 sm:p-2 bg-gray-100 rounded-xl text-gray-600 shrink-0">
              <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-3xl font-black text-dark tracking-tight mb-0.5 sm:mb-1">
            {stats.totalAnalyzed}
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            {stats.byType?.VIDEO || 0}V · {stats.byType?.IMAGE || 0}I · {stats.byType?.NEWS || 0}N
          </p>
        </div>

        <div className="glass-card p-3 sm:p-5">
          <div className="flex items-center justify-between mb-1.5 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate pr-1">Fakes Caught</span>
            <div className="p-1.5 sm:p-2 bg-red-50 rounded-xl text-danger shrink-0">
              <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-3xl font-black text-danger tracking-tight mb-0.5 sm:mb-1">
            {stats.fakesDetected}
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            {stats.fakePercentage}% of total
          </p>
        </div>

        <div className="glass-card p-3 sm:p-5">
          <div className="flex items-center justify-between mb-1.5 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate pr-1">Authentic</span>
            <div className="p-1.5 sm:p-2 bg-green-50 rounded-xl text-secondary shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-3xl font-black text-secondary tracking-tight mb-0.5 sm:mb-1">
            {stats.authenticCount}
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            Verified natural
          </p>
        </div>

        <div className="glass-card p-3 sm:p-5">
          <div className="flex items-center justify-between mb-1.5 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate pr-1">Precision</span>
            <div className="p-1.5 sm:p-2 bg-blue-50 rounded-xl text-primary shrink-0">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-3xl font-black text-primary tracking-tight mb-0.5 sm:mb-1">
            {stats.averageConfidence}%
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            Ensemble score
          </p>
        </div>
      </div>

      {/* Recent Analyses Activity Card */}
      <div className="glass-card p-3.5 sm:p-6">
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-6 pb-2.5 sm:pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-dark">Recent Verifications</h3>
            <p className="text-[10px] sm:text-xs text-gray-400">Latest analyses recorded in your telemetry ledger</p>
          </div>
          <Link to="/history" className="text-xs font-bold text-primary flex items-center hover:underline shrink-0">
            <span>Archive</span> <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>

        {stats.recentAnalyses && stats.recentAnalyses.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {stats.recentAnalyses.map((item) => (
              <div 
                key={item._id} 
                onClick={() => navigate('/results', { state: { result: item } })}
                className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-gray-50/80 active:bg-gray-100 px-2 sm:px-3 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md shrink-0">
                    {item.type}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-dark truncate">
                    {item.fileNameOrContent}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end space-x-2.5 sm:space-x-4 shrink-0 pt-1.5 sm:pt-0 border-t border-gray-50 sm:border-0">
                  <ResultBadge prediction={item.prediction} />
                  <span className="text-xs font-black text-dark min-w-[2.5rem] text-right">
                    {item.confidence}%
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/results', { state: { result: item } });
                    }}
                    className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                    title="View Dossier"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 text-gray-400 text-xs">
            <Shield className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-300" />
            <p className="font-semibold text-gray-600 mb-1">No Verification Runs Yet</p>
            <p className="text-[11px] sm:text-xs">Upload a video, image, or text above to run your first automated forensic check.</p>
          </div>
        )}
      </div>
    </div>
  );
}
