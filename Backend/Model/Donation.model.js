import mongoose from "mongoose";
const donationSchema = new mongoose.Schema({
    donationName: {
        type: String,
        required: true,
    },
    ngo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantityNeeded: {
        type: Number,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    donationType: {
        type: [String],
        enum: ['books', 'blankets', 'toys', 'stationary', 'anything', 'clothes', 'food'],
        required: true,  
    }
    ,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',  
    },
}, { timestamps: true });

const  Donation = mongoose.model('Donation', donationSchema);
export default Donation;