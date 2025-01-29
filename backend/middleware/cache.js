const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

const cacheMiddleware = (req, res, next) => {
  const key = req.body.url;
  const cachedData = cache.get(key);
  
  if (cachedData) {
    return res.json(cachedData);
  }
  next();
};

module.exports = cacheMiddleware;