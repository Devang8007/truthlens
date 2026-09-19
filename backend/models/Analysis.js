const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['VIDEO', 'IMAGE', 'NEWS'],
    required: true,
  },
  fileNameOrContent: {
    type: String,
    required: true,
  },
  prediction: {
    type: String, // e.g., "AUTHENTIC", "FAKE", "DEEPFAKE", "MISLEADING"
    required: true,
  },
  confidence: {
    type: Number, // 0 to 100
    required: true,
  },
  fileSize: {
    type: String,
    default: '—'
  },
  fileUrl: {
    type: String,
    default: ''
  },
  elaImage: {
    type: String,
    default: ''
  },
  domainReputation: {
    type: String,
    default: ''
  },
  modelUsed: {
    type: String,
    default: 'TruthLens Hybrid AI Ensemble'
  },
  findings: [{
    type: String
  }],
  claims: [{
    claim: { type: String, default: '' },
    status: { type: String, default: 'UNVERIFIABLE' },
    evidence: { type: String, default: '' }
  }],
  resultDetails: {
    type: Object, // Detailed metrics map
    required: false,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);
