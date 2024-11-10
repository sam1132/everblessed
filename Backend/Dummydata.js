import mongoose from 'mongoose';
import Donation from './Model/Donation.model.js';
import User from './Model/User.model.js';
import NGO from './Model/Ngo.model.js';

const donationTypes = ['book', 'blankets', 'toys', 'stationary', 'anything'];
const donationStatuses = ['pending', 'approved', 'rejected'];

async function generateDonations() {
    try {
        // Check if MongoDB connection is established
        if (mongoose.connection.readyState !== 1) {
            console.log("MongoDB is not connected. Exiting.");
            return;
        }

        // Get all NGOs from the database
        const ngos = await NGO.find();
        if (ngos.length === 0) {
            console.log("No NGOs found. Exiting.");
            return;
        }

        // Get all users to assign them to donations
        const users = await User.find();
        if (users.length === 0) {
            console.log("No users found. Exiting.");
            return;
        }

        // Loop through each NGO
        for (let ngo of ngos) {
            console.log(`Generating donations for NGO: ${ngo.ngoname}`);
            
            // Loop through each day of the year (365 days)
            const startYear = 2024;
            for (let day = 1; day <= 365; day++) {
                const currentDate = new Date(startYear, 0, day);

                // Generate a random number of donations between 20 and 100
                const numberOfDonations = Math.floor(Math.random() * (100 - 20 + 1)) + 20;

                // Create the donations for the current day
                for (let i = 0; i < numberOfDonations; i++) {
                    const donationData = {
                        donationName: `Donation for Day ${day} - ${i + 1}`,
                        ngo: ngo._id,
                        users: getRandomUsers(users),
                        donationType: getRandomItem(donationTypes),
                        status: getRandomItem(donationStatuses),
                        pickupLocation: `Pickup Location for Day ${day}`,
                        createdAt: currentDate,
                        updatedAt: currentDate,
                    };

                    await Donation.create(donationData);
                    console.log(`Donation ${i + 1} created for Day ${day} - NGO: ${ngo.ngoname}`);
                }
            }
        }

        console.log("Donation creation completed for all NGOs over 365 days.");
    } catch (error) {
        console.error("Error generating donations:", error);
    }
}

// Helper function to get a random user from the users array
function getRandomUsers(users) {
    const randomUsers = [];
    const numberOfUsers = Math.floor(Math.random() * 5) + 1; // Randomly select between 1 to 5 users
    for (let i = 0; i < numberOfUsers; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        randomUsers.push(user._id);
    }
    return randomUsers;
}

// Helper function to get a random item from an array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Connect to MongoDB
mongoose.connect('mongodb+srv://sam113273:nu2Lnj8sHCAMPWVB@donate.p64ft.mongodb.net/?retryWrites=true&w=majority&appName=donate', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log("Connected to MongoDB...");
    generateDonations();
})
.catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});
