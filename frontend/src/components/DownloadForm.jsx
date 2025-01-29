import React, { useState } from 'react';
import axios from 'axios';

const DownloadForm = () => {
  const [url, setUrl] = useState('');
  const [mediaUrls, setMediaUrls] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('mp4');

  const formatOptions = {
    video: ['mp4', 'webm'],
    image: ['jpg', 'png', 'webp']
  };

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setProgress(0);
    
    try {
      const response = await axios.post('/api/download', { 
        url,
        format: selectedFormat
      }, {
        onDownloadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentage);
        }
      });
      
      setMediaUrls(response.data.mediaUrls);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Paste Instagram URL here..."
          className="flex-1 p-2 border rounded-lg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Download'}
        </button>
      </div>

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-2">
        {mediaUrls.map((media, index) => (
          <div key={index} className="flex items-center gap-2">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="p-2 border rounded"
            >
              {formatOptions[media.type].map(format => (
                <option key={format} value={format}>{format.toUpperCase()}</option>
              ))}
            </select>
            <a
              href={media.url}
              download
              className="flex-1 block bg-gray-100 p-2 rounded hover:bg-gray-200"
            >
              Download {media.type.toUpperCase()}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadForm;