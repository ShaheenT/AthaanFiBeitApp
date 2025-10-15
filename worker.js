require('dotenv').config();
const mongoose = require('mongoose');
const WebSocket = require('ws');

const WS_PORT = process.env.WS_PORT || 8080;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Worker: MongoDB connected'))
  .catch(err => console.error('❌ Worker: MongoDB error', err));

// Dummy worker loop
setInterval(() => {
  console.log('⏱ Worker heartbeat - ready to trigger audio events');
}, 10000);
