const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Senior Forensic Analyst',
  },
  organization: {
    type: String,
    default: 'TruthLens Security Operations',
  },
  apiKey: {
    type: String,
    default: () => 'tl_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  },
  preferences: {
    autoArchive: { type: Boolean, default: true },
    strictMode: { type: Boolean, default: false },
    emailAlerts: { type: Boolean, default: true },
    confidenceThreshold: { type: Number, default: 80 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
