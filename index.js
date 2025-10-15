require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.SERVER_PORT || 5000;
const WS_PORT = process.env.WS_PORT || 8080;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error', err));

// Simple health check
app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));

// WebSocket connections
wss.on('connection', ws => {
  console.log('🟢 WebSocket client connected');
  ws.send(JSON.stringify({ message: 'Connected to EiXRaspi backend' }));

  ws.on('message', msg => {
    console.log('📩 Received:', msg.toString());
  });

  ws.on('close', () => console.log('🔴 WebSocket client disconnected'));
});

// Start server
server.listen(PORT, () => console.log(`🚀 HTTP server running on port ${PORT}`));
