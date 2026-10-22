import { Server } from 'socket.io';
import { getSystemMetrics } from '../services/metricsService.js';

let io;

export const initSockets = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client Connected: ${socket.id}`);

    // Send live system metrics every 2 seconds to connected client
    const interval = setInterval(async () => {
      const metrics = await getSystemMetrics();
      socket.emit('systemMetrics', metrics);
    }, 2000);

    socket.on('disconnect', () => {
      clearInterval(interval);
      console.log(`Client Disconnected: ${socket.id}`);
    });
  });
};