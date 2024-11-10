import mongoose from "mongoose";
import User from "./Model/User.model.js";
import Donation from "./Model/Donation.model.js";

async function updateDonationCounts() {
    try {
        // Connect to the database
        await mongoose.connect("mongodb+srv://sam113273:nu2Lnj8sHCAMPWVB@donate.p64ft.mongodb.net/?retryWrites=true&w=majority&appName=donate", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database");

        // Find all users
        const users = await User.find({});

        // Find all donations
        const donations = await Donation.find({});

        // Iterate through each user and update their donation count
        for (let user of users) {
            // Count how many donations the user is part of (based on the 'users' array in each donation)
            const donationCount = donations.filter(donation => donation.users.includes(user._id)).length;

            // Update the user document with the donation count
            await User.updateOne({ _id: user._id }, { donationCount });
            console.log(`Updated donation count for ${user.name}: ${donationCount}`);
        }

        console.log("Donation counts updated for all users");
    } catch (error) {
        console.error("Error updating donation counts:", error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

// Run the function to update donation counts
updateDonationCounts();

