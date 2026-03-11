import Donation from '../models/Donation.js';

// @desc    Create a new donation
// @route   POST /api/donations/create
// @access  Private/Donor
export const createDonation = async (req, res) => {
    try {
        const { foodType, quantity, expiryTime, pickupLocation, pickupWindow, imageUrl } = req.body;

        const donation = await Donation.create({
            donorId: req.user._id,
            foodType,
            quantity,
            expiryTime,
            pickupLocation,
            pickupWindow,
            imageUrl,
            status: 'posted'
        });

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all donations (active)
// @route   GET /api/donations
// @access  Public
export const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ status: 'posted' }).populate('donorId', 'name location');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get donation by ID
// @route   GET /api/donations/:id
// @access  Private
export const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id)
            .populate('donorId', 'name location');

        if (donation) {
            res.json(donation);
        } else {
            res.status(404).json({ message: 'Donation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
