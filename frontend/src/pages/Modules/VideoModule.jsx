import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { 
  Video, Image as ImageIcon, FileText, UploadCloud, Loader2, 
  AlertCircle, Sparkles, Play, X, Film, ChevronDown 
} from 'lucide-react';
import api from '../../api';

export default function VideoModule() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [error, setError] = useState('');
  const [showVectors, setShowVectors] = useState(false);
  const navigate = useNavigate();

  const scanSteps = [
    'Sampling 60fps Temporal Facial Keyframes...',
    'Analyzing Facial Landmark Micro-Jitter & Blending Seams...',
    'Testing Audio-Visual Phoneme vs Viseme Synchronization...',
    'Running ResNet-50 + XceptionNet Deepfake Model Ensemble...'
  ];

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setError('');
      setPreviewUrl(URL.createObjectURL(selected));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1
  });

  const handleClear = () => {
    setFile(null);
    setPreviewUrl('');
    setError('');
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a video file first.');
      return;
    }

    setLoading(true);
    setError('');
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 700);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'VIDEO');

    try {
      const res = await api.post('/analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      clearInterval(interval);
      navigate('/results', { state: { result: res.data } });
    } catch (err) {
      clearInterval(interval);
      setError(err.response?.data?.message || 'Video analysis failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-1 sm:py-6">
      {/* Module Switcher Header Bar */}
      <div className="flex items-center space-x-1 sm:space-x-2 p-1.5 bg-gray-100/90 rounded-2xl mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
        <Link 
          to="/modules/video" 
          className="flex-1 min-w-[95px] flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs"
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
          className="flex-1 min-w-[95px] flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all text-gray-500 hover:text-dark"
        >
          <FileText className="h-4 w-4" /> <span>News</span>
        </Link>
      </div>

      {/* Title & Banner */}
      <div className="mb-4 sm:mb-8 animate-in fade-in slide-in-from-top-4">
        <div className="inline-flex items-center space-x-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold mb-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Spatial-Temporal Facial Micro-Anomaly Detection</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-dark tracking-tight mb-1">
          Deepfake Video Verification
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Upload video footage to identify face-swaps, synthetic lip-sync, and AI avatar manipulation.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 sm:p-4 bg-danger/10 border border-danger/20 rounded-xl flex items-center text-danger max-w-3xl text-xs sm:text-sm">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Upload & Video Preview Card */}
        <div className="lg:col-span-2">
          {!previewUrl ? (
            <div 
              {...getRootProps()} 
              className={`glass-card p-5 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed transition-all duration-300 min-h-[220px] sm:min-h-[320px] ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="bg-primary/10 p-3 sm:p-4 rounded-2xl text-primary mb-3 sm:mb-4 shadow-xs">
                <UploadCloud className="h-7 w-7 sm:h-9 sm:w-9" />
              </div>
              
              {isDragActive ? (
                <p className="text-sm sm:text-base font-bold text-primary mb-1">Drop video here to verify</p>
              ) : (
                <>
                  <p className="text-sm sm:text-base font-bold text-dark mb-1">
                    Tap to select or drop video file
                  </p>
                  <p className="text-xs text-gray-500 mb-3">MP4, MOV, AVI, MKV up to 100 MB</p>
                </>
              )}
              <span className="text-[10px] sm:text-xs font-semibold text-gray-400 px-2.5 py-0.5 bg-gray-100 rounded-full">
                Encrypted & Processed Securely
              </span>
            </div>
          ) : (
            <div className="glass-card p-3.5 sm:p-6">
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-gray-100">
                <div className="flex items-center space-x-1.5 text-dark font-bold text-xs sm:text-sm">
                  <Film className="h-4 w-4 text-primary" />
                  <span>Footage Preview</span>
                </div>
                {!loading && (
                  <button 
                    onClick={handleClear}
                    className="text-xs text-gray-400 hover:text-danger flex items-center space-x-1 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Change</span>
                  </button>
                )}
              </div>

              <div className="relative rounded-xl overflow-hidden bg-black max-h-[240px] sm:max-h-[320px] flex items-center justify-center border border-gray-200">
                <video 
                  src={previewUrl} 
                  controls 
                  playsInline
                  className="max-h-[220px] sm:max-h-[300px] w-full object-contain"
                />
              </div>

              <div className="mt-3 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 p-2.5 sm:p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                <div className="min-w-0 flex-1 pr-2">
                  <p className="font-bold text-dark truncate">{file?.name}</p>
                  <p className="text-gray-400 text-[11px]">{(file?.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <span className="px-2 py-0.5 bg-primary/10 text-primary font-bold rounded-lg text-[10px] sm:text-[11px] self-start xs:self-auto shrink-0">
                  Ready to Inspect
                </span>
              </div>

              {loading && (
                <div className="mt-4 p-3.5 rounded-xl bg-primary/5 border border-primary/15 animate-in fade-in">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-spin shrink-0" />
                    <p className="text-xs sm:text-sm font-bold text-dark truncate">{scanSteps[scanStep]}</p>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 sm:mt-6 flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !file}
                  className="btn-primary w-full sm:w-auto space-x-2 justify-center py-2.5 sm:py-3 text-xs sm:text-sm font-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Inspecting Frame Sequences...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-white" />
                      <span>Start Video Deepfake Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Video Forensic Capabilities Card (Collapsible on Mobile) */}
        <div className="space-y-3 sm:space-y-6">
          <div className="glass-card p-4 sm:p-6">
            <button 
              onClick={() => setShowVectors(!showVectors)}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none"
            >
              <h3 className="text-xs sm:text-sm font-bold text-dark uppercase tracking-wider">
                Inspection Vectors
              </h3>
              <ChevronDown className={`h-4 w-4 text-gray-400 lg:hidden transition-transform ${showVectors ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`space-y-3 sm:space-y-4 text-xs mt-3 lg:block ${showVectors ? 'block' : 'hidden'}`}>
              <div className="flex items-start space-x-2.5">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Facial Boundary Tracking</p>
                  <p className="text-gray-500 mt-0.5">Detects blending anomalies where swapped faces meet natural jawline & hair.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Audio-Visual Sync (Visemes)</p>
                  <p className="text-gray-500 mt-0.5">Measures sub-50ms acoustic vs lip synchronization latency to catch audio clones.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Temporal Jitter Analysis</p>
                  <p className="text-gray-500 mt-0.5">Flags frame-to-frame lighting flicker and unnatural eye blink intervals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-3.5 sm:p-5 bg-gradient-to-br from-blue-50/50 to-white border-blue-100">
            <p className="text-[11px] sm:text-xs font-bold text-primary mb-0.5 sm:mb-1">Enterprise Standard</p>
            <p className="text-[10px] sm:text-[11px] text-gray-600 leading-relaxed">
              Trained across FaceForensics++, DFDC (Deepfake Detection Challenge), and Celeb-DF benchmark datasets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
