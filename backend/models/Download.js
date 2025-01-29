const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  mediaType: String,
  status: String,
  ip: String,
  format: String
});

module.exports = mongoose.model('Download', downloadSchema);