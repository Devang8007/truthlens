const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Analysis = require('../models/Analysis');
const multer = require('multer');

// Configure multer for mock uploads
const upload = multer({ dest: 'uploads/' });

// @route   POST api/analysis
// @desc    Perform mock analysis on video/image/news
// @access  Private
router.post('/', auth, upload.single('file'), async (req, res) => {
  const { type, textContent, urlContent } = req.body;

  let fileNameOrContent = '';
  if (type === 'VIDEO' || type === 'IMAGE') {
    fileNameOrContent = req.file ? req.file.originalname : 'unknown_file';
  } else if (type === 'NEWS') {
    fileNameOrContent = textContent || urlContent || 'unknown_content';
  } else {
    return res.status(400).json({ message: 'Invalid analysis type' });
  }

  // Simulate AI Processing Delay (2-3 seconds)
  setTimeout(async () => {
    // Generate Mock Results
    const isFake = Math.random() > 0.5;
    const confidence = Math.floor(Math.random() * 20) + 75; // 75% to 95%
    const prediction = isFake ? (type === 'NEWS' ? 'FAKE' : 'DEEPFAKE') : 'REAL';

    let resultDetails = {};
    if (type === 'VIDEO') {
      resultDetails = {
        face_manipulation: `${Math.floor(Math.random() * 40 + (isFake ? 50 : 0))}%`,
        audio_sync_anomaly: `${Math.floor(Math.random() * 40 + (isFake ? 50 : 0))}%`,
      };
    } else if (type === 'IMAGE') {
      resultDetails = {
        artifact_detection: `${Math.floor(Math.random() * 40 + (isFake ? 50 : 0))}%`,
        lighting_inconsistency: `${Math.floor(Math.random() * 40 + (isFake ? 50 : 0))}%`,
      };
    } else if (type === 'NEWS') {
      resultDetails = {
        sentiment_manipulation: `${Math.floor(Math.random() * 40 + (isFake ? 50 : 0))}%`,
        source_credibility_score: `${Math.floor(Math.random() * 50 + (!isFake ? 50 : 0))}%`,
      };
    }

    try {
      const newAnalysis = new Analysis({
        userId: req.user.id,
        type,
        fileNameOrContent,
        prediction,
        confidence,
        resultDetails,
      });

      const analysis = await newAnalysis.save();
      res.json(analysis);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }, 2500);
});

// @route   GET api/analysis/history
// @desc    Get user's analysis history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
