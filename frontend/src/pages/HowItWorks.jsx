import React from 'react';
import { Upload, Cpu, Search, FileCheck, Video, Image as ImageIcon, FileText, Database } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <div className="pt-24 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm">
            <span>Our Verification Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">
            The Science Behind the Verdict
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            TruthLens combines multiple specialized AI models into a unified verification pipeline — delivering explainable, high-accuracy results in seconds.
          </p>
        </div>
      </div>

      {/* 4 Steps Section */}
      <div className="bg-gray-50/50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-dark">Verification in 4 Steps</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-primary rounded-full text-white mb-6 shadow-lg shadow-primary/30">
                <Upload className="h-6 w-6" />
              </div>
              <div className="text-primary font-bold text-xl mb-1">01</div>
              <h3 className="text-lg font-bold text-dark mb-3">Upload Content</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Submit a video, image, or article link/text for verification.
              </p>
            </div>

            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-primary rounded-full text-white mb-6 shadow-lg shadow-primary/30">
                <Cpu className="h-6 w-6" />
              </div>
              <div className="text-primary font-bold text-xl mb-1">02</div>
              <h3 className="text-lg font-bold text-dark mb-3">AI Analysis</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our ensemble of deep learning models processes the content across multiple independent detection axes.
              </p>
            </div>

            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-primary rounded-full text-white mb-6 shadow-lg shadow-primary/30">
                <Search className="h-6 w-6" />
              </div>
              <div className="text-primary font-bold text-xl mb-1">03</div>
              <h3 className="text-lg font-bold text-dark mb-3">Indicator Extraction</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Specific manipulation artifacts, inconsistencies and red flags are identified, scored, and verified.
              </p>
            </div>

            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-primary rounded-full text-white mb-6 shadow-lg shadow-primary/30">
                <FileCheck className="h-6 w-6" />
              </div>
              <div className="text-primary font-bold text-xl mb-1">04</div>
              <h3 className="text-lg font-bold text-dark mb-3">Verdict & Report</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A confidence-weighted verdict is delivered with a full explanation and evidence citations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Models & Tech Section */}
      <div id="technology" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">AI Models & Technology</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Each detection module uses a specialized model trained on millions of real and synthetic samples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-8 border-l-4 border-l-primary">
              <div className="inline-flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                <Video className="h-4 w-4" /> <span>Deepfake Video</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">ResNet-50 + XceptionNet</h3>
              <p className="text-gray-500 text-sm">Spatial-domain method on facial frames combined with temporal anomaly detection.</p>
            </div>

            <div className="glass-card p-8 border-l-4 border-l-purple-500">
              <div className="inline-flex items-center space-x-2 text-purple-600 font-bold text-xs uppercase tracking-wider mb-2">
                <ImageIcon className="h-4 w-4" /> <span>AI Image</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Latent Diffusion Detector</h3>
              <p className="text-gray-500 text-sm">Convolution fingerprinting fine-tuned on Stable Diffusion, DALL-E, Midjourney outputs.</p>
            </div>

            <div className="glass-card p-8 border-l-4 border-l-blue-500">
              <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
                <FileText className="h-4 w-4" /> <span>Fake News</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">BERT + GPT-2 Classifier</h3>
              <p className="text-gray-500 text-sm">Fine-tuned RoBERTa model for stance detection, bias detection, and fact-checking.</p>
            </div>

            <div className="glass-card p-8 border-l-4 border-l-cyan-500">
              <div className="inline-flex items-center space-x-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
                <Search className="h-4 w-4" /> <span>Forensics</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">ELA + Metadata Forensics</h3>
              <p className="text-gray-500 text-sm">Error level analysis and file integrity verification pipeline.</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Architecture */}
      <div className="bg-primary py-24 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">System Architecture</h2>
          
          <div className="flex justify-center">
            <div className="w-full max-w-4xl p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12">
                <div className="px-6 py-3 bg-white/20 rounded-xl font-medium">React Frontend</div>
                <div className="hidden sm:block text-white/50">→</div>
                <div className="px-6 py-3 bg-white/20 rounded-xl font-medium">Node.js API</div>
                <div className="hidden sm:block text-white/50">→</div>
                <div className="px-6 py-3 bg-white/20 rounded-xl font-medium">Python AI Services</div>
                <div className="hidden sm:block text-white/50">→</div>
                <div className="px-6 py-3 bg-white/20 rounded-xl font-medium flex items-center gap-2"><Database className="h-4 w-4" /> MongoDB</div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="font-bold mb-2">Video Module</h4>
                  <p className="text-sm text-white/80">Face extraction<br/>Temporal analysis<br/>Audio correlation</p>
                </div>
                <div className="p-6 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="font-bold mb-2">Image Module</h4>
                  <p className="text-sm text-white/80">ELA, PRNU, Noise<br/>Diffusion detection<br/>Metadata validation</p>
                </div>
                <div className="p-6 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="font-bold mb-2">News Module</h4>
                  <p className="text-sm text-white/80">NLP, GPT classifier<br/>50+ trusted sources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
