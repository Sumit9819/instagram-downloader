import React, { useState } from 'react';
import axios from 'axios';

const DownloadForm = () => {
  const [url, setUrl] = useState('');
  const [mediaUrls, setMediaUrls] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/download', { url });
      setMediaUrls(response.data.mediaUrls);
      setError('');
    } catch (err) {
      setError('Failed to fetch. Check URL validity and post privacy.');
    }
    setLoading(false);
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

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-2">
        {mediaUrls.map((media, index) => (
          <a
            key={index}
            href={media.url}
            download
            className="block bg-gray-100 p-2 rounded hover:bg-gray-200"
          >
            Download {media.type.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadForm;
