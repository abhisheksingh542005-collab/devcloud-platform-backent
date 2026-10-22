import mongoose from 'mongoose';

const executionLogSchema = new mongoose.Schema(
  {
    workflow: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow', required: true },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    triggeredBy: { type: String, default: 'MANUAL' }, // MANUAL, WEBHOOK, CRON
    logs: [{ step: String, message: String, timestamp: { type: Date, default: Date.now } }],
    executionTimeMs: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('ExecutionLog', executionLogSchema);