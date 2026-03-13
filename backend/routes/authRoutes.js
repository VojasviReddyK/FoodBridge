import express from 'express';
import { registerUser, authUser, getUserProfile, forgotPassword, verifyOTP, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { googleLogin } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.post("/google", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;
