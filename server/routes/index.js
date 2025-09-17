import express from 'express';
import authRoutes from './auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Qlique API v1' });
});

router.use('/auth', authRoutes);

export default router;