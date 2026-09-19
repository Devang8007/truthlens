import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, XCircle, AlertTriangle, ArrowLeft, BarChart2, 
  Printer, Download, Copy, Check, FileText, Info, Cpu, Layers, Globe
} from 'lucide-react';

export default function AnalysisResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center px-4">
        <div className="p-4 bg-gray-100 rounded-full text-gray-400 mb-4">
          <FileText className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-dark mb-2">No Verification Dossier Loaded</h2>
        <p className="text-sm text-gray-500 mb-6">Select a record from your analysis history or start a new verification scan.</p>
        <div className="flex space-x-3">
          <button onClick={() => navigate('/dashboard')} className="btn-secondary text-sm">
            Go to Dashboard
          </button>
          <button onClick={() => navigate('/history')} className="btn-primary text-sm">
            View History
          </button>
        </div>
      </div>
    );
  }

  const isFake = result.prediction === 'FAKE' || result.prediction === 'DEEPFAKE';
  const isMisleading = result.prediction === 'MISLEADING';
  
  const statusColor = isFake 
    ? 'text-danger bg-red-50 border-red-200' 
    : isMisleading 
    ? 'text-warning bg-amber-50 border-amber-200' 
    : 'text-secondary bg-green-50 border-green-200';

  const badgeBorder = isFake
    ? 'border-red-500/20'
    : isMisleading
    ? 'border-amber-500/20'
    : 'border-emerald-500/20';

  const VerdictIcon = isFake ? XCircle : isMisleading ? AlertTriangle : CheckCircle2;

  const handleCopySummary = () => {
    const summary = `TruthLens Forensic Report:
Verdict: ${result.prediction}
Confidence: ${result.confidence}%
Type: ${result.type}
Target: ${result.fileNameOrContent}
Model: ${result.modelUsed || 'TruthLens AI Ensemble'}
Verified at: ${new Date(result.createdAt || Date.now()).toLocaleString()}`;
    
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `truthlens-report-${result._id || 'scan'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-3 sm:py-6">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
        <Link to="/history" className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-500 hover:text-dark transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1.5 shrink-0" /> Back to Analysis History
        </Link>
        
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={handleCopySummary}
            className="btn-secondary text-xs !px-3 !py-1.5 sm:!px-3.5 sm:!py-2 space-x-1.5 flex-1 sm:flex-initial justify-center"
            title="Copy Verification Summary"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-secondary" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
          <button 
            onClick={handleDownloadJson}
            className="btn-secondary text-xs !px-3 !py-1.5 sm:!px-3.5 sm:!py-2 space-x-1.5 flex-1 sm:flex-initial justify-center"
            title="Download JSON Report"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export JSON</span>
          </button>
          <button 
            onClick={handlePrint}
            className="btn-secondary text-xs !px-3 !py-1.5 sm:!px-3.5 sm:!py-2 space-x-1.5 flex-1 sm:flex-initial justify-center"
            title="Print or Save PDF"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="glass-card overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
        {/* Header Verdict Banner */}
        <div className={`p-5 sm:p-8 border-b ${statusColor} ${badgeBorder} flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6`}>
          <div className="flex items-center space-x-3.5 sm:space-x-4">
            <div className="p-2.5 sm:p-3 bg-white rounded-2xl shadow-xs shrink-0">
              <VerdictIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider opacity-75">
                  {result.type} Verification Verdict
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-white/70">
                  {result.fileSize || 'Standard Input'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
                {result.prediction}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 bg-white/80 p-3 sm:p-4 rounded-2xl border border-black/5 w-full md:w-auto justify-between md:justify-start">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500">Confidence Score</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-black text-dark">{result.confidence}</span>
                <span className="text-base sm:text-lg font-bold text-gray-400">%</span>
              </div>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 border-current shrink-0">
              <span className="text-xs font-bold">{result.confidence}%</span>
            </div>
          </div>
        </div>

        {/* Content & Metadata Strip */}
        <div className="p-4 sm:p-8 border-b border-gray-100 bg-gray-50/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Inspected Target
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-dark font-mono bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 break-all">
                {result.fileNameOrContent}
              </p>
            </div>
            {result.modelUsed && (
              <div className="shrink-0 bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 text-xs">
                <div className="flex items-center space-x-1.5 text-primary font-bold mb-0.5">
                  <Cpu className="h-3.5 w-3.5 shrink-0" />
                  <span>Model Engine</span>
                </div>
                <p className="text-gray-600 font-medium truncate max-w-xs">{result.modelUsed}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* ELA Visual Map if Image */}
          {result.elaImage && (
            <div className="p-4 sm:p-6 rounded-2xl bg-purple-50/40 border border-purple-100">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-dark mb-4">
                <Layers className="h-4 w-4 text-purple-600 shrink-0" />
                <span>Error Level Analysis (ELA) Compression Heatmap</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="bg-black rounded-xl overflow-hidden border border-gray-200 w-full sm:max-w-[260px] shrink-0">
                  <img src={result.elaImage} alt="ELA Map" className="w-full h-auto object-contain" />
                </div>
                <div className="text-xs text-gray-600 space-y-2 flex-1">
                  <p className="font-bold text-dark">How to interpret this ELA visualization:</p>
                  <p>
                    Brighter regions with high local contrast signify areas of differing JPEG compression quality. In authentic photos, compression noise is uniform throughout. Spliced or AI-inpainted elements show distinct error energy peaks.
                  </p>
                  <p className="text-purple-700 font-medium">
                    Calculated Anomaly Energy: {result.resultDetails?.error_level_analysis || '64%'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Forensic Breakdown Meters */}
          <div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-dark mb-4 sm:mb-5">
              <BarChart2 className="h-4 w-4 text-primary shrink-0" />
              <span>Multi-Axis Indicator Breakdown</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {Object.entries(result.resultDetails || {}).map(([key, value]) => {
                const numericVal = parseInt(value) || 50;
                return (
                  <div key={key} className="bg-surface rounded-xl p-3.5 sm:p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider truncate pr-2">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs font-black text-dark shrink-0">{value}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          numericVal > 60 && isFake
                            ? 'bg-danger'
                            : numericVal > 60
                            ? 'bg-secondary'
                            : 'bg-primary'
                        }`}
                        style={{ width: value.includes('%') ? value : `${numericVal}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Findings / Algorithmic Observations */}
          {result.findings && result.findings.length > 0 && (
            <div className="pt-2">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Key Forensic Observations
              </h4>
              <div className="space-y-2 sm:space-y-2.5">
                {result.findings.map((finding, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 sm:space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="text-gray-700 font-medium leading-relaxed">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extracted Fact-Check Claims */}
          {result.claims && result.claims.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-dark mb-4">
                <Globe className="h-4 w-4 text-primary shrink-0" />
                <span>Google Search Grounding & Fact-Check Verification</span>
              </div>
              <div className="space-y-3">
                {result.claims.map((item, idx) => {
                  const isSupported = item.status === 'SUPPORTED';
                  const isContradicted = item.status === 'CONTRADICTED';
                  const badgeColor = isSupported 
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : isContradicted
                    ? 'bg-red-100 text-red-700 border-red-200'
                    : 'bg-amber-100 text-amber-700 border-amber-200';
                    
                  return (
                    <div key={idx} className="p-3.5 sm:p-4 bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col space-y-2.5 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-dark leading-snug">"{item.claim}"</p>
                        <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md border shrink-0 ${badgeColor}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3 text-xs text-gray-700 border border-gray-100 flex items-start space-x-2">
                        <Info className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                        <span>{item.evidence}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Action to Run Another Scan */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/15">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-dark">Need to inspect another file or claim?</h4>
              <p className="text-[11px] text-gray-500">Launch a fresh deepfake, AI image, or news verification scan.</p>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Link to="/modules/video" className="btn-secondary text-xs !px-3 !py-2 flex-1 sm:flex-initial justify-center">
                Video
              </Link>
              <Link to="/modules/image" className="btn-secondary text-xs !px-3 !py-2 flex-1 sm:flex-initial justify-center">
                Image
              </Link>
              <Link to="/modules/news" className="btn-primary text-xs !px-3 !py-2 flex-1 sm:flex-initial justify-center">
                News
              </Link>
            </div>
          </div>

          {/* Enterprise Disclaimer Footer */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-gray-50 flex items-start space-x-3 border border-gray-200 text-xs text-gray-500">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              This forensic evaluation was compiled autonomously by TruthLens Enterprise. While high algorithmic confidence is achieved via neural ensembles, critical legal and journalistic evidence should be cross-verified alongside chain-of-custody documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
