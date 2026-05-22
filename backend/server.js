const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const excuseRoutes = require('./routes/excuseRoutes');
const proofRoutes = require('./routes/proofRoutes');
const voiceRoutes = require('./routes/voiceRoutes');
const historyRoutes = require('./routes/historyRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/excuses', excuseRoutes);
app.use('/api/proof', proofRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/emergency', emergencyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
