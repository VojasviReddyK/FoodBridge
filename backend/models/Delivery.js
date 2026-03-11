import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Donation'
    },
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    acceptorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    otpCode: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        enum: ['accepted', 'picked_up', 'delivered', 'completed'],
        default: 'accepted'
    }
}, {
    timestamps: true
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
