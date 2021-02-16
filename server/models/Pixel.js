const mongoose = require('mongoose')

const PixelSchema = new mongoose.Schema({
    name: String,
    available: {type: Boolean, default: true},
    accessed: [{date: Date, ip: String}],
    created: {type: Date, default: Date.now}
  });

  module.exports = mongoose.model('Pixel',PixelSchema)