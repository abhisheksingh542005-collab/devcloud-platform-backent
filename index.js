import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
 //import './config/redis.js'; // Redis connection load karne ke liye
import errorHandler from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { initSockets } from './sockets/socketManager.js';
 //  import { startJobProcessors } from './queues/jobProcessors.js';

import authRoutes from './routes/authRoutes.js';
import workflowRoutes from './routes/workflowRoutes.js';
import metricsRoutes from './routes/metricsRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
//   import redis from'./config/redis.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize DB, Sockets & Background Workers
connectDB();
initSockets(server);
 // startJobProcessors(); // BullMQ background worker start hoga

// Middlewares
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173', // Aapka frontend URL
  credentials: true
}));

// Apply Rate Limiter to all API routes
app.use('/api/', apiLimiter);

// Routes Linking
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workflows', workflowRoutes);
app.use('/api/v1/metrics', metricsRoutes);
app.use('/api/v1/webhooks', webhookRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server & WebSockets running successfully on port ${PORT}`);
});