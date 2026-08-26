import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Video, UploadCloud, Loader2, AlertCircle } from 'lucide-react';
import api from '../../api';

export default function VideoModule() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      setFile(acceptedFiles[0]);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1
  });

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a video file first.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'VIDEO');

    try {
      const res = await api.post('/analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Navigate to results page with the data
      navigate('/results', { state: { result: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4">
        <div className="inline-flex p-4 bg-primary/10 rounded-2xl text-primary mb-4">
          <Video className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Deepfake Video Detection</h1>
        <p className="text-gray-400">Upload a video to analyze facial manipulation and AI-generated anomalies.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-lg flex items-center text-danger max-w-2xl mx-auto">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="glass-card max-w-2xl mx-auto p-8 animate-in fade-in zoom-in duration-500 delay-100">
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-white/20 hover:border-white/40 bg-surface/50'
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className={`h-16 w-16 mx-auto mb-4 ${isDragActive ? 'text-primary' : 'text-gray-500'}`} />
          
          {file ? (
            <div>
              <p className="text-white font-medium text-lg mb-1">{file.name}</p>
              <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-white font-medium text-lg mb-1">
                Drag & drop a video here
              </p>
              <p className="text-gray-500 text-sm">or click to browse files (MP4, MOV, AVI)</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !file}
            className={`btn-primary flex items-center px-8 ${(!file || loading) ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Analyzing Video...
              </>
            ) : 'Analyze Video'}
          </button>
        </div>
      </div>
    </div>
  );
}
