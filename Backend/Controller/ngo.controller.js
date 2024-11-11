import NGO from "../Model/Ngo.model.js";
import Donation from "../Model/Donation.model.js";
export const addDonation = async (req, res) => {
    const{donationName,description,itemType,quantityNeeded} = req.body;
    const ngo = req.user.id;
    try {
        const newDonation = new Donation({
            donationName,
            description,
            ngo,
            donationType:itemType,
            quantityNeeded
        });
        await newDonation.save();
        res.status(201).json({message: "Donation added successfully"});
    } catch (error) {
        console.error("addDonation:", error);
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

export const getDonations = async (req, res) => {
    try {
        // Fetch the last 20 donations sorted by creation date in descending order
        const donations = await Donation.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(donations);
    } catch (error) {
        console.error("getDonations:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
