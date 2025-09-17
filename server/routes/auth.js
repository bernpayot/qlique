import express from 'express';
import { authController } from '../controller/authController.js';
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';
import { authRateLimit, loginSlowDown } from '../middleware/rateLimiting.js';

const router = express.Router();

router.post('/register', authRateLimit, loginSlowDown, authController.register);
router.post('/login', authRateLimit, loginSlowDown, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);

// Return raw JWT claims for debugging/consumption
router.get('/claims', verifyAccessToken, (req, res) => {
	res.json({ success: true, claims: req.user });
});

export default router;