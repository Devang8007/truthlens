import React, { useState } from 'react';
import { Download, Search, Video, Image as ImageIcon, FileText, CheckCircle2, XCircle, AlertTriangle, Eye } from 'lucide-react';

export default function History() {
  const [filter, setFilter] = useState('All Types');

  const mockData = [
    { id: 1, type: 'Video', content: 'ceo-interview-leak.mp4', result: 'FAKE', confidence: '92%', size: '48.2 MB', date: 'Aug 24, 2026' },
    { id: 2, type: 'Image', content: 'viral-photo-aug24.jpg', result: 'AUTHENTIC', confidence: '87%', size: '2.1 MB', date: 'Aug 24, 2026' },
    { id: 3, type: 'News', content: 'Breaking: Economic Crisis in Indi...', result: 'MISLEADING', confidence: '78%', size: '—', date: 'Aug 23, 2026' },
    { id: 4, type: 'Video', content: 'protest-footage-mumbai.mp4', result: 'AUTHENTIC', confidence: '95%', size: '112 MB', date: 'Aug 23, 2026' },
    { id: 5, type: 'Image', content: 'politician-rally-photo.png', result: 'FAKE', confidence: '88%', size: '1.8 MB', date: 'Aug 22, 2026' },
    { id: 6, type: 'News', content: 'New Vaccine Claims 100% Effica...', result: 'FAKE', confidence: '91%', size: '—', date: 'Aug 22, 2026' },
    { id: 7, type: 'Video', content: 'election-speech-clip.mp4', result: 'MISLEADING', confidence: '65%', size: '23.4 MB', date: 'Aug 21, 2026' },
  ];

  const filteredData = filter === 'All Types' 
    ? mockData 
    : mockData.filter(item => item.type === filter.split(' ')[0]);

  const TypeIcon = ({ type }) => {
    if (type === 'Video') return <Video className="h-4 w-4 mr-2 text-gray-500" />;
    if (type === 'Image') return <ImageIcon className="h-4 w-4 mr-2 text-gray-500" />;
    return <FileText className="h-4 w-4 mr-2 text-gray-500" />;
  };

  const ResultBadge = ({ result }) => {
    if (result === 'FAKE') {
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-danger border border-red-100">
          <XCircle className="h-3 w-3 mr-1.5" /> FAKE
        </div>
      );
    }
    if (result === 'AUTHENTIC') {
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-secondary border border-green-100">
          <CheckCircle2 className="h-3 w-3 mr-1.5" /> AUTHENTIC
        </div>
      );
    }
    return (
      <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-50 text-warning border border-yellow-100">
        <AlertTriangle className="h-3 w-3 mr-1.5" /> MISLEADING
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">Analysis History</h1>
          <p className="text-gray-500 font-medium">All your past verification analyses in one place.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-surface border border-gray-200 text-dark font-medium rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4 mr-2 text-gray-500" />
          Export CSV
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {['All Types', 'Video Only', 'Image Only', 'News Only'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                filter === tab 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-surface text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search history..."
            className="pl-9 pr-4 py-2 bg-surface border border-gray-200 rounded-full text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary w-64"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Content</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Result</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-dark bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                      <TypeIcon type={row.type} />
                      {row.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark">
                    {row.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ResultBadge result={row.result} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-dark">
                    {row.confidence}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 flex items-center space-x-3">
                    <button className="hover:text-primary transition-colors p-1.5 rounded-md hover:bg-primary/5">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="hover:text-primary transition-colors p-1.5 rounded-md hover:bg-primary/5">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
