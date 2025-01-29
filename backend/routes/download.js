const express = require('express');
const router = express.Router();
const instagram = require('../utils/instagram');
const { rateLimiter } = require('../middleware/rateLimit');

router.post('/', rateLimiter, async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const mediaId = instagram.extractMediaIdFromUrl(url);
    if (!mediaId) {
      return res.status(400).json({ error: 'Invalid Instagram URL' });
    }

    const mediaInfo = await instagram.getMediaInfo(mediaId);
    res.json({ mediaUrls: [mediaInfo] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;