import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Link as LinkIcon, Loader2, AlertCircle } from 'lucide-react';
import api from '../../api';

export default function NewsModule() {
  const [inputType, setInputType] = useState('text'); // 'text' or 'url'
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError(`Please enter a ${inputType === 'text' ? 'text excerpt' : 'URL'} to analyze.`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        type: 'NEWS',
        ...(inputType === 'text' ? { textContent: content } : { urlContent: content })
      };

      const res = await api.post('/analysis', payload);
      navigate('/results', { state: { result: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4">
        <div className="inline-flex p-4 bg-warning/10 rounded-2xl text-warning mb-4">
          <FileText className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Fake News Detection</h1>
        <p className="text-gray-400">Analyze text excerpts or article URLs for misinformation, bias, and sentiment manipulation.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-lg flex items-center text-danger max-w-2xl mx-auto">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="glass-card max-w-2xl mx-auto p-8 animate-in fade-in zoom-in duration-500 delay-100">
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => { setInputType('text'); setContent(''); setError(''); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex justify-center items-center ${
              inputType === 'text' ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-surface border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="h-5 w-5 mr-2" />
            Paste Text
          </button>
          <button
            onClick={() => { setInputType('url'); setContent(''); setError(''); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex justify-center items-center ${
              inputType === 'url' ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-surface border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LinkIcon className="h-5 w-5 mr-2" />
            Enter URL
          </button>
        </div>

        <div>
          {inputType === 'text' ? (
            <textarea
              className="input-field min-h-[200px] resize-y"
              placeholder="Paste the news article or text excerpt here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <input
              type="url"
              className="input-field"
              placeholder="https://example.com/news-article"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !content.trim()}
            className={`bg-warning hover:bg-yellow-600 text-white font-medium py-2 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-warning/30 flex items-center ${(!content.trim() || loading) ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : 'hover:scale-[1.02] active:scale-95'}`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Analyzing Content...
              </>
            ) : 'Analyze Content'}
          </button>
        </div>
      </div>
    </div>
  );
}
