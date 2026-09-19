const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded media statically
app.use('/uploads', express.static(uploadsDir));

// System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'TruthLens API Gateway',
    version: '2.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/analysis', require('./routes/analysis'));
app.use('/api/users', require('./routes/users'));

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: `Endpoint ${req.originalUrl} not found on TruthLens Gateway` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Gateway Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/truthlens';

// Resilient MongoDB connection
const connectWithRetry = () => {
  console.log('Connecting to MongoDB at:', MONGO_URI);
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB successfully connected.');
    })
    .catch(err => {
      console.error('MongoDB connection issue:', err.message);
      console.log('Will retry connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`TruthLens API Gateway running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
