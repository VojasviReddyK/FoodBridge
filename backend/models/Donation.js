import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    foodType: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    pickupWindow: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['posted', 'accepted', 'picked_up', 'delivered', 'completed'],
        default: 'posted'
    }
}, {
    timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
