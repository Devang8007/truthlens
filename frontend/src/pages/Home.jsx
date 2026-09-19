import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, PlayCircle, Video, Image as ImageIcon, FileText, ChevronRight, Shield } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center pt-14 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm">
            <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-primary" />
            <span>AI-Powered Media Verification Platform</span>
          </div>
          
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold text-dark tracking-tight leading-[1.15] break-words">
            Verify What You See.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#7a70ff]">Trust What Is Real.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
            TruthLens uses advanced AI to detect deepfake videos, identify AI-generated images, and expose fake news — protecting you from digital deception.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto px-4">
            <Link to="/register" className="btn-primary rounded-full w-full sm:w-auto px-8 py-3.5 text-base sm:text-lg flex items-center justify-center shadow-lg shadow-primary/30">
              Start Verification Free <span className="ml-2 font-bold">→</span>
            </Link>
            <button 
              onClick={() => navigate('/how-it-works')}
              className="flex items-center justify-center space-x-2 w-full sm:w-auto text-dark font-medium border border-gray-200 rounded-full px-8 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <PlayCircle className="h-5 w-5 text-gray-500" />
              <span>See How It Works</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-8 sm:pt-12 text-xs sm:text-sm font-medium text-gray-500">
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
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight mb-3">
            Multi-Modal Forensics Detection
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Specialized deep neural pipelines engineered to uncover synthesis artifacts across video, visual, and textual vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="glass-card p-6 sm:p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mb-6">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-3 sm:mb-4">Deepfake Video Detection</h3>
            <p className="text-gray-500 text-sm mb-6 sm:mb-8 leading-relaxed">
              Upload any video and our AI scans for facial manipulation, audio-visual sync issues, GAN artifacts, and temporal inconsistencies.
            </p>
            <ul className="space-y-3 mb-6 sm:mb-8 flex-1 text-sm text-gray-600">
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Frame-by-frame facial analysis</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Audio-visual sync detection</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> GAN artifact identification</li>
            </ul>
            <Link to="/modules/video" className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors text-sm">
              Analyze a Video <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 sm:p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="p-3 bg-purple-100 rounded-xl text-purple-600 w-fit mb-6">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-3 sm:mb-4">AI Image Analysis</h3>
            <p className="text-gray-500 text-sm mb-6 sm:mb-8 leading-relaxed">
              Detect AI-generated images from Stable Diffusion, DALL-E, Midjourney and more. Our model identifies pixel-level inconsistencies.
            </p>
            <ul className="space-y-3 mb-6 sm:mb-8 flex-1 text-sm text-gray-600">
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Multi-generator detection</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> ELA & metadata analysis</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Noise pattern fingerprinting</li>
            </ul>
            <Link to="/modules/image" className="text-purple-600 font-medium flex items-center hover:text-purple-800 transition-colors text-sm">
              Analyze an Image <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 sm:p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="p-3 bg-cyan-100 rounded-xl text-cyan-600 w-fit mb-6">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-3 sm:mb-4">Fake News Verification</h3>
            <p className="text-gray-500 text-sm mb-6 sm:mb-8 leading-relaxed">
              Paste any article, headline, or URL. TruthLens cross-references 50+ trusted sources and uses NLP to detect misinformation patterns.
            </p>
            <ul className="space-y-3 mb-6 sm:mb-8 flex-1 text-sm text-gray-600">
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Cross-source fact checking</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Sentiment & bias analysis</li>
              <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-secondary mr-2 shrink-0" /> Evidence source citations</li>
            </ul>
            <Link to="/modules/news" className="text-cyan-600 font-medium flex items-center hover:text-cyan-800 transition-colors text-sm">
              Verify News <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#0f172a] py-14 sm:py-20 mt-6 sm:mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">1.2M+</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Analyses Run</div>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">387K+</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Fakes Detected</div>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">94.7%</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Accuracy Rate</div>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">28K+</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Active Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
          <div className="flex items-center space-x-2.5">
            <div className="bg-primary p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold text-dark tracking-wide leading-none">TruthLens</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Media Forensics</span>
            </div>
          </div>
          
          <div>
            <p className="text-xs sm:text-sm font-semibold text-dark mb-1">Capstone Project — BE Computer Engineering</p>
            <p className="text-xs sm:text-sm text-gray-500">Devang Ashok Sharma · Aarti Suresh Chavan · Ketaki Ashok Patil</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Guide: Ashish Kulkarni Sir</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
