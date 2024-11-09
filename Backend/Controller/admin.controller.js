// import asyncHandler from "express-async-handler";
// import Donation from "../Model/Donation.model.js";
// import mongoose from "mongoose";
// import NGO from "../Model/Ngo.model.js";
// import User from "../Model/User.model.js";

// export const getDonationslist = asyncHandler(async (req, res) => {
// console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);

// const donor = await Donation.find({});
// if (!donor) {
// return res.status(404).json({ message: "Donor not found" });
// }
// else {
//     res.status(200).json( donor );
// }

// })

import asyncHandler from "express-async-handler";
import Donation from "../Model/Donation.model.js";
import mongoose from "mongoose";

export const getDonationslist = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // Get the page number from the query, default to 1
    const limit = 10;  // Limit of 10 entries per page
    const skip = (page - 1) * limit;  // Skip the previous pages' entries

    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);

    try {
        // Fetch donors with pagination
        const donors = await Donation.find({})
            .skip(skip)
            .limit(limit);

        // Count total number of donors to calculate total pages
        const totalDonors = await Donation.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalDonors / limit);

        res.status(200).json({ donors, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch donors" });
    }
});
