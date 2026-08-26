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
    type: String, // e.g., "REAL", "FAKE", "DEEPFAKE"
    required: true,
  },
  confidence: {
    type: Number, // 0 to 100
    required: true,
  },
  resultDetails: {
    type: Object, // Mock detailed analysis, e.g., { face_manipulation: 85%, audio_sync: 90% }
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);
