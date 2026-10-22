import { Worker } from 'bullmq';
import { logger } from '../utils/logger.js';

const redisConnection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
};

export const startJobProcessors = () => {
  const worker = new Worker(
    'workflowQueue',
    async (job) => {
      logger.info(`Processing Background Job ID: ${job.id} for Workflow: ${job.data.workflowId}`);
      // Asynchronous background task processing logic
    },
    { connection: redisConnection }
  );

  worker.on('completed', (job) => {
    logger.info(`Job ID ${job.id} has completed successfully.`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Job ID ${job.id} failed with error: ${err.message}`);
  });
};