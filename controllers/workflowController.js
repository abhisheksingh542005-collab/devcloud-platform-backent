import Workflow from '../models/Workflow.js';
import { resolveAndExecuteDAG } from '../services/dagResolver.js';

export const createWorkflow = async (req, res, next) => {
  try {
    const { title, description, nodes, edges } = req.body;

    const workflow = await Workflow.create({
      user: req.user._id,
      title,
      description,
      nodes,
      edges,
    });

    res.status(201).json({
      success: true,
      workflow,
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkflows = async (req, res, next) => {
  try {
    const workflows = await Workflow.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      count: workflows.length,
      workflows,
    });
  } catch (error) {
    next(error);
  }
};

export const executeWorkflow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workflow = await Workflow.findById(id);

    if (!workflow) {
      res.status(404);
      throw new Error('Workflow not found');
    }

    const executionOrder = await resolveAndExecuteDAG(workflow.nodes, workflow.edges);

    res.status(200).json({
      success: true,
      message: 'Workflow executed successfully via DAG resolver',
      executionOrder,
    });
  } catch (error) {
    next(error);
  }
};