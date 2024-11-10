

import mongoose from 'mongoose';
import NGO from './Model/Ngo.model.js'; // Import the NGO model
import faker from 'faker'; // Import the faker library

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://sam113273:nu2Lnj8sHCAMPWVB@donate.p64ft.mongodb.net/?retryWrites=true&w=majority&appName=donate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB...");
})
.catch((err) => {
  console.log("Error connecting to MongoDB:", err);
});

// Function to generate random NGOs
async function generateNGOs() {
    try {
        const ngos = [];

        // Create 30 NGOs
        for (let i = 0; i < 30; i++) {
            const ngo = {
                ngoname: faker.company.companyName(),
                registrationNumber: faker.random.alphaNumeric(10), // Random registration number
                address: faker.address.streetAddress(),
                description: faker.lorem.sentence(),
                email: faker.internet.email(),
                thingsRequired: faker.random.arrayElements(['book', 'blankets', 'toys', 'food', 'anything'], 2), // Random items required
                socialLinks: {
                    insta: faker.internet.url(),
                    facebook: faker.internet.url(),
                    twitter: faker.internet.url(),
                },
                usersDonated: [],  // You can leave this empty, or later populate with user references
                ngoType: faker.random.arrayElement(['NGO Type 1', 'NGO Type 2', 'NGO Type 3']), // Random NGO type
                totalDonationsMade: faker.random.number({ min: 0, max: 500 }),
                isApproved: faker.random.boolean(),
            };

            ngos.push(ngo);
        }

        // Insert NGOs into MongoDB
        await NGO.insertMany(ngos);
        console.log("30 NGOs generated and inserted into the database.");
    } catch (error) {
        console.error("Error generating NGOs:", error);
    }
}

// Call the function to generate and insert data
generateNGOs();
