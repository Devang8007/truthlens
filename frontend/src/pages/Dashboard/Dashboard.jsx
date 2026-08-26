import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Image as ImageIcon, FileText, ArrowRight, Database, XCircle, CheckCircle, TrendingUp } from 'lucide-react';

export default function Dashboard({ user }) {
  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl font-bold text-dark mb-2">Good morning, {user?.username || 'Devang'} 👋</h1>
        <p className="text-gray-500 font-medium">Here's your verification overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Video Module */}
        <Link to="/modules/video" className="group glass-card p-6 flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:shadow-md">
          <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mb-5">
            <Video className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-dark mb-2">Deepfake Video Detection</h2>
          <p className="text-gray-500 text-sm mb-6 flex-grow">Upload a video file for AI-powered deepfake analysis</p>
          <div className="flex items-center text-primary font-medium text-sm group-hover:gap-1.5 transition-all">
            Start Analysis <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>

        {/* Image Module */}
        <Link to="/modules/image" className="group glass-card p-6 flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:shadow-md">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600 w-fit mb-5">
            <ImageIcon className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-dark mb-2">AI Image Analysis</h2>
          <p className="text-gray-500 text-sm mb-6 flex-grow">Detect AI-generated or manipulated images instantly</p>
          <div className="flex items-center text-purple-600 font-medium text-sm group-hover:gap-1.5 transition-all">
            Start Analysis <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>

        {/* News Module */}
        <Link to="/modules/news" className="group glass-card p-6 flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:shadow-md">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600 w-fit mb-5">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-dark mb-2">Fake News Verification</h2>
          <p className="text-gray-500 text-sm mb-6 flex-grow">Cross-reference articles against trusted fact sources</p>
          <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-1.5 transition-all">
            Start Analysis <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6">
          <div className="p-2 bg-gray-100 rounded-lg text-gray-500 w-fit mb-4">
            <Database className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold text-dark mb-1">1,247</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Total Analyzed</p>
          <p className="text-xs text-gray-400">+23 today</p>
        </div>

        <div className="glass-card p-6">
          <div className="p-2 bg-red-50 rounded-lg text-danger w-fit mb-4">
            <XCircle className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold text-dark mb-1">389</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Fakes Detected</p>
          <p className="text-xs text-gray-400">31.2% of total</p>
        </div>

        <div className="glass-card p-6">
          <div className="p-2 bg-green-50 rounded-lg text-secondary w-fit mb-4">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold text-dark mb-1">858</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Authentic</p>
          <p className="text-xs text-gray-400">68.8% of total</p>
        </div>

        <div className="glass-card p-6">
          <div className="p-2 bg-blue-50 rounded-lg text-primary w-fit mb-4">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold text-dark mb-1">94.7%</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Avg. Accuracy</p>
          <p className="text-xs text-gray-400">+0.3% this week</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-dark">Recent Analyses</h3>
          <Link to="/history" className="text-sm font-medium text-primary flex items-center hover:underline">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="text-center py-8 text-gray-500 text-sm">
          No recent analyses to show.
        </div>
      </div>
    </div>
  );
}
