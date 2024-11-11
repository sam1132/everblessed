import mongoose from 'mongoose';
const ngoSchema = new mongoose.Schema({
    ngoname: {
        type: String,
        required: true, },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    password: {
        type: String, 
        required: true },
    email: {
        type: String,
        required: true,
        unique: true,},
    thingsRequired: {
        type: [String],
        enum: ['book', 'blankets', 'toys', 'food', 'anything','clothes','stationary'],
        default: ['anything'],  
        
    },

// adding social media handles
   socialLinks:{
    insta:{
        type:String,
        default: null
    },
    facebook:{
        type:String,
        default: null
    },
    twitter:{
        type:String,
        default: null
    },
   },
    usersDonated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    ngoType: {
        type: String,
        required: true,
    },
    totalDonationsMade: {
        type: Number,
        default: 0, 
    },
    isApproved: {
        type: Boolean,
        default: false,  
    },
}, { timestamps: true });
const NGO = mongoose.model('NGO', ngoSchema);
export default NGO;