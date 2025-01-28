const express = require('express');
const router = express.Router();
const { validateUrl, fetchMedia } = require('../utils/instagram');

router.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!validateUrl(url)) {
      return res.status(400).json({ error: "Invalid Instagram URL" });
    }

    const mediaUrls = await fetchMedia(url);
    res.json({ mediaUrls });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

module.exports = router;
