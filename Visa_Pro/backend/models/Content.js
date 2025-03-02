const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['home', 'about', 'contact', 'footer'],
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ContentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Content', ContentSchema);