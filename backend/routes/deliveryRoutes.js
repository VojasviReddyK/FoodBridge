import express from 'express';
import { acceptPickup, verifyOTP, completeDelivery } from '../controllers/deliveryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/accept', protect, authorize('volunteer'), acceptPickup);
router.post('/verify-otp', protect, authorize('volunteer'), verifyOTP);
router.post('/complete', protect, authorize('acceptor'), completeDelivery);

export default router;
