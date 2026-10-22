import express from 'express';
const router = express.Router();

router.post('/trigger', (req, res) => res.json({ message: 'Webhook triggered', payload: req.body }));

export default router;