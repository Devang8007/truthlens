import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Download, Search, Video, Image as ImageIcon, FileText, 
  CheckCircle2, XCircle, AlertTriangle, Eye, Trash2, RefreshCw, PlusCircle
} from 'lucide-react';
import api from '../../api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedVerdict, setSelectedVerdict] = useState('ALL');
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/analysis/history');
      if (res.data && res.data.length > 0) {
        setHistory(res.data);
      } else {
        // If brand new account without scans yet, show initial sample records
        setHistory([
          {
            _id: 'seed-1',
            type: 'VIDEO',
            fileNameOrContent: 'executive_press_conference_leak.mp4',
            prediction: 'DEEPFAKE',
            confidence: 94,
            fileSize: '48.2 MB',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            modelUsed: 'TruthLens ResNet-50 + XceptionNet Deepfake Detector',
            resultDetails: { face_manipulation: '89%', audio_sync_anomaly: '76%', temporal_jitter_index: '82%' },
            findings: ['Facial boundary warping identified.', 'Audio phoneme to visual viseme desynchronization exceeded threshold.']
          },
          {
            _id: 'seed-2',
            type: 'IMAGE',
            fileNameOrContent: 'presidential_summit_photo.jpg',
            prediction: 'AUTHENTIC',
            confidence: 91,
            fileSize: '3.4 MB',
            createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
            modelUsed: 'TruthLens Latent Diffusion Detector v2.4 + ELA Forensics',
            resultDetails: { error_level_analysis: '18%', gan_fingerprint_probability: '12%', metadata_integrity: '96%' },
            findings: ['Uniform error level distribution across JPEG quantization tables.', 'Natural camera sensor noise profile verified.']
          },
          {
            _id: 'seed-3',
            type: 'NEWS',
            fileNameOrContent: 'Viral Claim: Central Bank Announces Instant Digital Currency Withdrawal Freeze',
            prediction: 'FAKE',
            confidence: 88,
            fileSize: '—',
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            modelUsed: 'TruthLens RoBERTa Misinformation Classifier v4.0',
            resultDetails: { sentiment_manipulation: '85%', source_credibility_score: '22%', sensationalism_index: '90%' },
            findings: ['Sensationalist vocabulary and emotional panic triggers detected.', 'Uncorroborated by independent news wire registries.']
          }
        ]);
      }
    } catch (err) {
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this verification record?')) return;
    
    setDeletingId(id);
    try {
      if (!id.startsWith('seed-')) {
        await api.delete(`/analysis/${id}`);
      }
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete analysis record.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCsv = () => {
    if (history.length === 0) return;

    const headers = ['ID', 'Date', 'Type', 'Target Content', 'Prediction', 'Confidence (%)', 'File Size', 'Model'];
    const rows = filteredData.map(item => [
      `"${item._id}"`,
      `"${new Date(item.createdAt).toLocaleString()}"`,
      `"${item.type}"`,
      `"${(item.fileNameOrContent || '').replace(/"/g, '""')}"`,
      `"${item.prediction}"`,
      item.confidence,
      `"${item.fileSize || '—'}"`,
      `"${item.modelUsed || 'Ensemble'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `truthlens-history-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredData = history.filter(item => {
    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    const matchesVerdict = selectedVerdict === 'ALL' || 
      (selectedVerdict === 'FAKE' && (item.prediction === 'FAKE' || item.prediction === 'DEEPFAKE')) ||
      (selectedVerdict === 'AUTHENTIC' && item.prediction === 'AUTHENTIC') ||
      (selectedVerdict === 'MISLEADING' && item.prediction === 'MISLEADING');
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      (item.fileNameOrContent && item.fileNameOrContent.toLowerCase().includes(query)) ||
      (item.prediction && item.prediction.toLowerCase().includes(query));

    return matchesType && matchesVerdict && matchesSearch;
  });

  const TypeIcon = ({ type }) => {
    if (type === 'VIDEO') return <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-primary shrink-0" />;
    if (type === 'IMAGE') return <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-purple-600 shrink-0" />;
    return <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-blue-600 shrink-0" />;
  };

  const ResultBadge = ({ prediction }) => {
    if (prediction === 'FAKE' || prediction === 'DEEPFAKE') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-danger border border-red-200 shrink-0">
          <XCircle className="h-3 w-3 mr-1" /> {prediction}
        </span>
      );
    }
    if (prediction === 'AUTHENTIC' || prediction === 'REAL') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-secondary border border-green-200 shrink-0">
          <CheckCircle2 className="h-3 w-3 mr-1" /> AUTHENTIC
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-warning border border-amber-200 shrink-0">
        <AlertTriangle className="h-3 w-3 mr-1" /> MISLEADING
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-3 sm:py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-dark tracking-tight">Analysis History & Audit Log</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Tamper-evident archive of all media verification scans.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button 
            onClick={fetchHistory}
            className="btn-secondary text-xs px-3 py-2 space-x-1.5"
            title="Refresh History"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={handleExportCsv}
            disabled={filteredData.length === 0}
            className="btn-secondary text-xs px-3 py-2 space-x-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-xs px-3.5 py-2 space-x-1.5"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>New Scan</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-3.5 sm:p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Type Filter Tabs */}
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Modules' },
            { id: 'VIDEO', label: 'Video Only' },
            { id: 'IMAGE', label: 'Image Only' },
            { id: 'NEWS', label: 'News Only' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedType === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Verdict Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedVerdict}
            onChange={(e) => setSelectedVerdict(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-dark focus:outline-none focus:border-primary"
          >
            <option value="ALL">All Verdicts</option>
            <option value="FAKE">Fake / Deepfake</option>
            <option value="AUTHENTIC">Authentic</option>
            <option value="MISLEADING">Misleading</option>
          </select>

          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search keyword or file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-dark placeholder-gray-400 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Adaptive Responsive Display */}
      {/* 1. Mobile Card View (< md) */}
      <div className="block md:hidden space-y-3">
        {filteredData.length === 0 ? (
          <div className="glass-card p-8 text-center text-gray-400 text-xs">
            No verification records found matching your filters.
          </div>
        ) : (
          filteredData.map((item) => (
            <div 
              key={item._id} 
              onClick={() => navigate('/results', { state: { result: item } })}
              className="glass-card p-4 space-y-3 cursor-pointer hover:border-primary/40 active:bg-gray-50 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center font-bold text-xs text-dark bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                  <TypeIcon type={item.type} />
                  <span>{item.type}</span>
                </div>
                <ResultBadge prediction={item.prediction} />
              </div>

              <div>
                <p className="text-xs font-bold text-dark leading-snug break-words">
                  {item.fileNameOrContent}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5">
                  <span>Confidence: <strong className="text-dark">{item.confidence}%</strong></span>
                  <span>{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">{item.fileSize || 'Standard Input'}</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/results', { state: { result: item } });
                    }}
                    className="p-1.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center space-x-1 text-xs font-semibold cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Dossier</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                    disabled={deletingId === item._id}
                    className="p-1.5 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2. Desktop Table View (>= md) */}
      <div className="hidden md:block glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Target Content</th>
                <th className="px-6 py-3.5">Verdict</th>
                <th className="px-6 py-3.5">Confidence</th>
                <th className="px-6 py-3.5">Size</th>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                    No verification records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center font-bold text-dark bg-white w-fit px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                        <TypeIcon type={row.type} />
                        <span>{row.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-dark max-w-xs truncate">
                      {row.fileNameOrContent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ResultBadge prediction={row.prediction} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-black text-dark">
                      {row.confidence}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {row.fileSize || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(row.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button 
                          onClick={() => navigate('/results', { state: { result: row } })}
                          title="View Forensic Dossier"
                          className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(row._id)}
                          disabled={deletingId === row._id}
                          title="Delete Record"
                          className="p-1.5 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
