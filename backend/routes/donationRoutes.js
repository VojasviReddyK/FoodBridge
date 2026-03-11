import express from 'express';
import { createDonation, getDonations, getDonationById } from '../controllers/donationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, authorize('donor'), createDonation);
router.get('/', getDonations);
router.get('/:id', protect, getDonationById);

export default router;
