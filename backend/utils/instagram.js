const axios = require('axios');
const cheerio = require('cheerio');

const validateUrl = (url) => {
  const pattern = /^(https?:\/\/)?(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\/?/;
  return pattern.test(url);
};

const fetchMedia = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const mediaUrls = [];

    // Extract video and image URLs
    $('meta[property^="og:video"], meta[property^="og:image"]').each((_, element) => {
      const property = $(element).attr('property');
      const content = $(element).attr('content');
      
      if (property.includes('video')) {
        mediaUrls.push({ type: 'video', url: content });
      } else if (property.includes('image')) {
        mediaUrls.push({ type: 'image', url: content });
      }
    });

    return mediaUrls;
    
  } catch (error) {
    throw new Error('Failed to fetch Instagram post');
  }
};

module.exports = { validateUrl, fetchMedia };
