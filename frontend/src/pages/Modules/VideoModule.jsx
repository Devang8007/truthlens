import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Video, UploadCloud, Loader2, AlertCircle, Sparkles, Play, X, Film } from 'lucide-react';
import api from '../../api';

export default function VideoModule() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [error, setError] = useState('');
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
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-8 animate-in fade-in slide-in-from-top-4">
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Spatial-Temporal Facial Micro-Anomaly Detection</span>
        </div>
        <h1 className="text-3xl font-black text-dark tracking-tight mb-2">Deepfake Video Verification</h1>
        <p className="text-sm text-gray-500">Upload video footage to identify face-swaps, synthetic lip-sync, and AI avatar manipulation.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-xl flex items-center text-danger max-w-3xl">
          <AlertCircle className="h-5 w-5 mr-2.5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Upload & Video Preview Card */}
        <div className="lg:col-span-2">
          {!previewUrl ? (
            <div 
              {...getRootProps()} 
              className={`glass-card p-12 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed transition-all duration-300 min-h-[340px] ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="bg-primary/10 p-4 rounded-2xl text-primary mb-5 shadow-xs">
                <UploadCloud className="h-10 w-10" />
              </div>
              
              {isDragActive ? (
                <p className="text-lg font-bold text-primary mb-1">Drop the video here to verify</p>
              ) : (
                <>
                  <p className="text-lg font-bold text-dark mb-1">
                    Drag and drop your video file here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or click to browse files from your computer</p>
                </>
              )}
              <span className="text-xs font-semibold text-gray-400 px-3 py-1 bg-gray-100 rounded-full">
                MP4, MOV, AVI, MKV · Up to 100 MB
              </span>
            </div>
          ) : (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center space-x-2 text-dark font-bold text-sm">
                  <Film className="h-4 w-4 text-primary" />
                  <span>Video Footage Preview</span>
                </div>
                {!loading && (
                  <button 
                    onClick={handleClear}
                    className="text-xs text-gray-400 hover:text-danger flex items-center space-x-1 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Change Video</span>
                  </button>
                )}
              </div>

              <div className="relative rounded-xl overflow-hidden bg-black max-h-[340px] flex items-center justify-center border border-gray-200">
                <video 
                  src={previewUrl} 
                  controls 
                  className="max-h-[320px] w-full object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                <div>
                  <p className="font-bold text-dark truncate max-w-xs">{file?.name}</p>
                  <p className="text-gray-400 mt-0.5">{(file?.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <span className="px-2.5 py-1 bg-primary/10 text-primary font-bold rounded-lg text-[11px]">
                  Ready to Inspect
                </span>
              </div>

              {loading && (
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/15 animate-in fade-in">
                  <div className="flex items-center space-x-3 mb-2">
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    <p className="text-sm font-bold text-dark">{scanSteps[scanStep]}</p>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !file}
                  className="btn-primary space-x-2"
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

        {/* Video Forensic Capabilities Card */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4">Inspection Vectors</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Facial Boundary Tracking</p>
                  <p className="text-gray-500">Detects blending anomalies where swapped faces meet natural jawline & hair.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Audio-Visual Sync (Visemes)</p>
                  <p className="text-gray-500">Measures sub-50ms acoustic vs lip synchronization latency to catch audio clones.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-dark">Temporal Jitter Analysis</p>
                  <p className="text-gray-500">Flags frame-to-frame lighting flicker and unnatural eye blink intervals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-br from-blue-50/50 to-white border-blue-100">
            <p className="text-xs font-bold text-primary mb-1">Enterprise Standard</p>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Trained across FaceForensics++, DFDC (Deepfake Detection Challenge), and Celeb-DF benchmark datasets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
