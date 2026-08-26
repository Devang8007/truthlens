import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, PlayCircle, Video, Image as ImageIcon, FileText, ChevronRight, Shield } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center pt-20 pb-16 sm:pt-32 sm:pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm">
            <Zap className="h-4 w-4 fill-primary" />
            <span>AI-Powered Media Verification Platform</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold text-dark tracking-tight leading-tight">
            Verify What You See.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#7a70ff]">Trust What Is Real.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            TruthLens uses advanced AI to detect deepfake videos, identify AI-generated images, and expose fake news — protecting you from digital deception.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register" className="btn-primary rounded-full px-8 py-3.5 text-lg flex items-center shadow-lg shadow-primary/30">
              Start Verification Free <span className="ml-2 font-bold">→</span>
            </Link>
            <button 
              onClick={() => navigate('/how-it-works')}
              className="flex items-center space-x-2 text-dark font-medium border border-gray-200 rounded-full px-8 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <PlayCircle className="h-5 w-5 text-gray-500" />
              <span>See How It Works</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm font-medium text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="bg-secondary/10 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-secondary" /></div>
              <span>94.7% Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-secondary/10 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-secondary" /></div>
              <span>1M+ Analyses Run</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-secondary/10 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-secondary" /></div>
              <span>Research-Backed AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mb-6">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Deepfake Video Detection</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Upload any video and our AI scans for facial manipulation, audio-visual sync issues, GAN artifacts, and temporal inconsistencies.
            </p>
            <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-600">
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Frame-by-frame facial analysis</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Audio-visual sync detection</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> GAN artifact identification</li>
            </ul>
            <Link to="/modules/video" className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors">
              Analyze a Video <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="p-3 bg-purple-100 rounded-xl text-purple-600 w-fit mb-6">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">AI Image Analysis</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Detect AI-generated images from Stable Diffusion, DALL-E, Midjourney and more. Our model identifies pixel-level inconsistencies.
            </p>
            <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-600">
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Multi-generator detection</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> ELA & metadata analysis</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Noise pattern fingerprinting</li>
            </ul>
            <Link to="/modules/image" className="text-purple-600 font-medium flex items-center hover:text-purple-800 transition-colors">
              Analyze an Image <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="p-3 bg-cyan-100 rounded-xl text-cyan-600 w-fit mb-6">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Fake News Verification</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Paste any article, headline, or URL. TruthLens cross-references 50+ trusted sources and uses NLP to detect misinformation patterns.
            </p>
            <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-600">
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Cross-source fact checking</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Sentiment & bias analysis</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Evidence source citations</li>
            </ul>
            <Link to="/modules/news" className="text-cyan-600 font-medium flex items-center hover:text-cyan-800 transition-colors">
              Verify News <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#0f172a] py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-700/50">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">1.2M+</div>
              <div className="text-gray-400 text-sm sm:text-base font-medium">Analyses Run</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">387K+</div>
              <div className="text-gray-400 text-sm sm:text-base font-medium">Fakes Detected</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">94.7%</div>
              <div className="text-gray-400 text-sm sm:text-base font-medium">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">28K+</div>
              <div className="text-gray-400 text-sm sm:text-base font-medium">Active Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-dark tracking-wide">TruthLens</span>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium text-dark mb-1">Capstone Project — BE Computer Engineering</p>
            <p className="text-sm text-gray-500">Devang Ashok Sharma · Aarti Suresh Chavan · Ketaki Ashok Patil</p>
            <p className="text-sm text-gray-400 mt-1">Guide: Ashish Kulkarni Sir</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
