import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ImageModule() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      setFile(acceptedFiles[0]);
      // Navigate to results page immediately for sprint 1 mock
      navigate('/results', { state: { type: 'image', file: acceptedFiles[0].name } });
    }
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">AI Image Analysis</h1>
        <p className="text-gray-500 font-medium">Upload an image to detect if it was AI-generated or digitally manipulated.</p>
      </div>

      <div 
        {...getRootProps()} 
        className={`glass-card p-12 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed transition-all duration-300 mb-8 min-h-[320px] ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="bg-gray-100 p-4 rounded-xl text-gray-500 mb-6">
          <UploadCloud className="h-8 w-8" />
        </div>
        
        {isDragActive ? (
          <p className="text-xl font-bold text-primary mb-2">Drop the image here ...</p>
        ) : (
          <p className="text-xl font-bold text-dark mb-2">
            Drop your image here <br />
            <span className="text-base font-normal text-gray-500">or click to browse</span>
          </p>
        )}
        <p className="text-sm text-gray-400 mt-6">Supports JPG, PNG, WEBP, HEIC - Max 50 MB</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-dark mb-6">Detection Methods</h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" />
            </div>
            <div className="ml-3">
              <label className="text-sm font-bold text-dark">Error Level Analysis (ELA)</label>
              <p className="text-xs text-gray-500">Identifies regions with differing JPEG compression levels</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" />
            </div>
            <div className="ml-3">
              <label className="text-sm font-bold text-dark">GAN Fingerprint Detection</label>
              <p className="text-xs text-gray-500">Detects patterns left by Stable Diffusion, DALL-E, Midjourney</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" />
            </div>
            <div className="ml-3">
              <label className="text-sm font-bold text-dark">Metadata Forensics</label>
              <p className="text-xs text-gray-500">Examines EXIF data for inconsistencies and tampering</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
