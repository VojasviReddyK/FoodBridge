import Review from '../models/Review.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
    try {
        const { targetUserId, rating, comment } = req.body;

        const review = await Review.create({
            reviewerId: req.user._id,
            targetUserId,
            rating,
            comment
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user reviews
// @route   GET /api/reviews/:userId
// @access  Public
export const getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ targetUserId: req.params.userId })
            .populate('reviewerId', 'name role');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
