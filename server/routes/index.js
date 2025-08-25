import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Qlique API v1' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;