import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security and parser middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Request timing header
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'OMEGA-X-Engine');
  next();
});

// Routes
app.use('/api', healthRouter);

// Fallback 404 for API
app.use('/api/*', (_req, res) => {
  res.status(404).json({ error: 'Endpoint not found or not implemented in Phase 1' });
});

app.listen(PORT, () => {
  console.log(`[OMEGA X Core] Server running on port ${PORT}`);
  console.log(`[OMEGA X Core] Health endpoint ready at http://localhost:${PORT}/api/health`);
});