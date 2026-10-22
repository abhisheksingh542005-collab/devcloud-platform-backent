import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Get workflows' }));
router.post('/', (req, res) => res.json({ message: 'Create workflow' }));

export default router;