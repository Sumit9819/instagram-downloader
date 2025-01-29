const Queue = require('bull');
const { fetchMedia } = require('./instagram');
const logger = require('./logger');

const downloadQueue = new Queue('media-downloads', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

downloadQueue.process(async (job) => {
  try {
    const { url, format } = job.data;
    return await fetchMedia(url, format);
  } catch (error) {
    logger.error('Queue processing error:', error);
    throw error;
  }
});

module.exports = downloadQueue;