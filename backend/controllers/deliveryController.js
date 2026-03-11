import Delivery from '../models/Delivery.js';
import Donation from '../models/Donation.js';
import { sendOTP } from '../services/email.js';

// Helper to generate 4 digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// @desc    Accept a donation pickup
// @route   POST /api/deliveries/accept
// @access  Private/Volunteer
export const acceptPickup = async (req, res) => {
    try {
        const { donationId } = req.body;

        const donation = await Donation.findById(donationId).populate('donorId', 'email name');
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        if (donation.status !== 'posted') {
            return res.status(400).json({ message: 'Donation is no longer available' });
        }

        const otpCode = generateOTP();

        const delivery = await Delivery.create({
            donationId,
            volunteerId: req.user._id,
            otpCode,
            deliveryStatus: 'accepted'
        });

        // Update donation status
        donation.status = 'accepted';
        await donation.save();

        // Send OTP to donor's email
        await sendOTP(donation.donorId.email, otpCode);

        res.status(201).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP to pick up food
// @route   POST /api/deliveries/verify-otp
// @access  Private/Volunteer
export const verifyOTP = async (req, res) => {
    try {
        const { deliveryId, otpCode } = req.body;

        const delivery = await Delivery.findById(deliveryId);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        if (delivery.volunteerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized for this delivery' });
        }

        if (delivery.otpCode !== otpCode) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        delivery.deliveryStatus = 'picked_up';
        await delivery.save();

        const donation = await Donation.findById(delivery.donationId);
        if (donation) {
            donation.status = 'picked_up';
            await donation.save();
        }

        res.json({ message: 'OTP verified successfully, food picked up.', delivery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Complete a delivery
// @route   POST /api/deliveries/complete
// @access  Private/Acceptor
export const completeDelivery = async (req, res) => {
    try {
        const { deliveryId } = req.body;

        const delivery = await Delivery.findById(deliveryId);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        if (delivery.deliveryStatus !== 'picked_up') {
            return res.status(400).json({ message: 'Food must be picked up before completing delivery' });
        }

        delivery.deliveryStatus = 'completed';
        delivery.acceptorId = req.user._id;
        await delivery.save();

        const donation = await Donation.findById(delivery.donationId);
        if (donation) {
            donation.status = 'completed';
            await donation.save();
        }

        res.json({ message: 'Delivery completed successfully.', delivery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
