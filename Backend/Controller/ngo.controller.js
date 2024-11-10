import User from "../Model/User.model.js";
import NGO from "../Model/Ngo.model.js";
import Donation from "../Model/Donation.model.js";
export const addDonation = async (req, res) => {
    const{donationName,description,ngo,donationType,quantityNeeded} = req.body;
    console.log(req.body);
    try {
        const newDonation = new Donation({
            donationName,
            description,
            ngo,
            donationType,
            quantityNeeded
        });
        await newDonation.save();
        res.status(201).json({message: "Donation added successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}
