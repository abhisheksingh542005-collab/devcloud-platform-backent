import express from 'express';
const router = express.Router();

router.get('/system', (req, res) => res.json({ cpu: '12%', memory: '45%' }));

export default router;