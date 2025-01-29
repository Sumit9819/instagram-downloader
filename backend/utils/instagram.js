const axios = require('axios');

class InstagramAPI {
  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    this.baseURL = 'https://graph.instagram.com/v12.0';
  }

  async getMediaInfo(mediaId) {
    try {
      const response = await axios.get(`${this.baseURL}/${mediaId}`, {
        params: {
          fields: 'id,media_type,media_url,thumbnail_url,permalink',
          access_token: this.accessToken
        }
      });
      
      return this.formatMediaResponse(response.data);
    } catch (error) {
      throw this.handleAPIError(error);
    }
  }

  formatMediaResponse(data) {
    const mediaInfo = {
      id: data.id,
      type: data.media_type.toLowerCase(),
      url: data.media_type === 'VIDEO' ? data.thumbnail_url : data.media_url,
      permalink: data.permalink
    };

    return mediaInfo;
  }

  handleAPIError(error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error('Invalid media ID or URL');
        case 401:
          throw new Error('Invalid access token');
        case 403:
          throw new Error('Permission denied');
        case 429:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error(data.error?.message || 'Failed to fetch media');
      }
    }
    throw new Error('Network error occurred');
  }

  extractMediaIdFromUrl(url) {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      const matches = path.match(/\/p\/([^\/]+)/);
      return matches ? matches[1] : null;
    } catch (error) {
      throw new Error('Invalid Instagram URL');
    }
  }
}

module.exports = new InstagramAPI();