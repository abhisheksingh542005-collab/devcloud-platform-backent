import mongoose from 'mongoose';

const workflowSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    nodes: { type: Array, default: [] }, // Stores visual canvas nodes
    edges: { type: Array, default: [] }, // Stores connection paths
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Workflow', workflowSchema);