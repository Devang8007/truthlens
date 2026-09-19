import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Video, Image as ImageIcon, FileText, Loader2, AlertCircle, 
  Sparkles, Globe, AlignLeft, ChevronDown 
} from 'lucide-react';
import api from '../../api';

export default function NewsModule() {
  const [inputType, setInputType] = useState('text'); // 'text' or 'url'
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [error, setError] = useState('');
  const [showSignals, setShowSignals] = useState(false);
  const navigate = useNavigate();

  const scanSteps = [
    'Parsing NLP Syntax, Sentiment Extremity & Clickbait Triggers...',
    'Cross-referencing 50+ Verified Global News Wires & Fact Databases...',
    'Checking Domain Reputation & Editorial Attribution Records...',
    'Generating Linguistic Credibility Breakdown...'
  ];

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError(`Please enter a ${inputType === 'text' ? 'text excerpt' : 'URL'} to verify.`);
      return;
    }

    setLoading(true);
    setError('');
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const payload = {
        type: 'NEWS',
        ...(inputType === 'text' ? { textContent: content } : { urlContent: content })
      };

      const res = await api.post('/analysis', payload);
      clearInterval(interval);
      navigate('/results', { state: { result: res.data } });
    } catch (err) {
      clearInterval(interval);
      setError(err.response?.data?.message || 'Misinformation analysis failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-1 sm:py-6">
      {/* Module Switcher Header Bar */}
      <div className="flex items-center space-x-1 sm:space-x-2 p-1.5 bg-gray-100/90 rounded-2xl mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
        <Link 
          to="/modules/video" 
          className="flex-1 min-w-[95px] flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all text-gray-500 hover:text-dark"
        >
          <Video className="h-4 w-4" /> <span>Video</span>
        </Link>
        <Link 
          to="/modules/image" 
          className="flex-1 min-w-[95px] flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all text-gray-500 hover:text-dark"
        >
          <ImageIcon className="h-4 w-4" /> <span>Image</span>
        </Link>
        <Link 
          to="/modules/news" 
          className="flex-1 min-w-[95px] flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all bg-white text-blue-600 shadow-xs"
        >
          <FileText className="h-4 w-4" /> <span>News</span>
        </Link>
      </div>

      {/* Title & Banner */}
      <div className="mb-4 sm:mb-8 animate-in fade-in slide-in-from-top-4">
        <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold mb-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">RoBERTa Misinformation Classifier & Fact-Check Cross-Reference</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-dark tracking-tight mb-1">
          Fake News & Misinformation Verification
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Scan news articles, social media posts, or headline claims for bias, factual inaccuracies, and coordinated disinformation.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 sm:p-4 bg-danger/10 border border-danger/20 rounded-xl flex items-center text-danger max-w-3xl text-xs sm:text-sm">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2.5 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="glass-card p-3.5 sm:p-6">
            {/* Input Toggle */}
            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 p-1 bg-gray-100/80 rounded-xl">
              <button
                type="button"
                onClick={() => { setInputType('text'); setContent(''); setError(''); }}
                className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-lg font-bold text-xs flex justify-center items-center space-x-1.5 transition-all cursor-pointer ${
                  inputType === 'text'
                    ? 'bg-white text-dark shadow-xs'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                <AlignLeft className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Paste Excerpt</span>
              </button>
              <button
                type="button"
                onClick={() => { setInputType('url'); setContent(''); setError(''); }}
                className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-lg font-bold text-xs flex justify-center items-center space-x-1.5 transition-all cursor-pointer ${
                  inputType === 'url'
                    ? 'bg-white text-dark shadow-xs'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Article URL</span>
              </button>
            </div>

            {/* Input Field */}
            <div className="mb-4">
              {inputType === 'text' ? (
                <div>
                  <textarea
                    rows={6}
                    className="input-field text-xs sm:text-sm leading-relaxed resize-y"
                    placeholder="Paste the article text, viral rumor, or press statement here for deep NLP cross-verification..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 mt-1.5 px-1 text-[10px] sm:text-xs text-gray-400">
                    <span>{wordCount} words · {charCount} characters</span>
                    <span>Min. recommended: 20 words</span>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    className="input-field text-xs sm:text-sm"
                    placeholder="https://example.com/news/article-headline"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 px-1">
                    TruthLens will inspect domain reputation, meta headers, and publisher registries.
                  </p>
                </div>
              )}
            </div>

            {/* Progress Ticker */}
            {loading && (
              <div className="mt-4 mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-100 animate-in fade-in">
                <div className="flex items-center space-x-2.5 mb-2">
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 animate-spin shrink-0" />
                  <p className="text-xs sm:text-sm font-bold text-blue-900 truncate">{scanSteps[scanStep]}</p>
                </div>
                <div className="w-full bg-blue-200/50 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                onClick={handleAnalyze}
                disabled={loading || !content.trim()}
                className="btn-primary w-full sm:w-auto space-x-2 bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 justify-center py-2.5 sm:py-3 text-xs sm:text-sm font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Fact-Checking Content...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    <span>Verify Information</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* NLP Info Card (Collapsible on Mobile) */}
        <div className="space-y-3 sm:space-y-6">
          <div className="glass-card p-4 sm:p-6">
            <button 
              onClick={() => setShowSignals(!showSignals)}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none"
            >
              <h3 className="text-xs sm:text-sm font-bold text-dark uppercase tracking-wider">
                Evaluation Signals
              </h3>
              <ChevronDown className={`h-4 w-4 text-gray-400 lg:hidden transition-transform ${showSignals ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`space-y-3 sm:space-y-4 text-xs mt-3 lg:block ${showSignals ? 'block' : 'hidden'}`}>
              <div className="flex items-start space-x-2.5">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Sensationalism & Clickbait</p>
                  <p className="text-gray-500 mt-0.5">Detects emotionally provocative phrasing, hyperbole, and manipulative headlines.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Source Consensus Index</p>
                  <p className="text-gray-500 mt-0.5">Cross-verifies claims against AP, Reuters, BBC, and independent fact-checking wires.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Linguistic Polarization</p>
                  <p className="text-gray-500 mt-0.5">Evaluates partisan slant, confirmation bias phrasing, and synthetic prose markers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-3.5 sm:p-5 bg-gradient-to-br from-blue-50/50 to-white border-blue-100">
            <p className="text-[11px] sm:text-xs font-bold text-blue-900 mb-0.5 sm:mb-1">Explainable AI</p>
            <p className="text-[10px] sm:text-[11px] text-gray-600 leading-relaxed">
              Every analysis generates a bulleted forensic breakdown highlighting specific phrases and corroboration status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
