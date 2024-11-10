import mongoose from 'mongoose';
import NGO from "./Model/Ngo.model.js"; // Assuming the model is stored in a file named NGO.js

// Sample NGO data
const sampleNGOs = [
  {
    ngoname: "Helping Hands Foundation",
    registrationNumber: "HF12345",
    address: "123 Hope Street, Cityville, Country",
    description: "A foundation dedicated to providing food and education to underprivileged children.",
    email: "contact@helpinghands.org",
    thingsRequired: ["food", "book", "toys"],
    socialLinks: {
      insta: "https://www.instagram.com/helpinghandsfoundation",
      facebook: "https://www.facebook.com/helpinghandsfoundation",
      twitter: "https://twitter.com/helpinghandsfoundation",
    },
    usersDonated: [],
    ngoType: "Education & Welfare",
    totalDonationsMade: 2500,
    isApproved: false,
  },
  {
    ngoname: "Books for All",
    registrationNumber: "BA67890",
    address: "456 Literacy Lane, Booktown, Country",
    description: "A nonprofit focused on providing books to children and adults in need of educational resources.",
    email: "info@booksforall.org",
    thingsRequired: ["book", "anything"],
    socialLinks: {
      insta: "https://www.instagram.com/booksforall",
      facebook: "https://www.facebook.com/booksforall",
      twitter: "https://twitter.com/booksforall",
    },
    usersDonated: [],
    ngoType: "Education",
    totalDonationsMade: 1000,
    isApproved: false,
  },
  {
    ngoname: "Winter Warmth Initiative",
    registrationNumber: "WW11223",
    address: "789 Comfort Road, Wintercity, Country",
    description: "Providing blankets, jackets, and warm food to the homeless during the winter months.",
    email: "support@winterwarmth.org",
    thingsRequired: ["blankets", "food"],
    socialLinks: {
      insta: "https://www.instagram.com/winterwarmthinitiative",
      facebook: "https://www.facebook.com/winterwarmthinitiative",
      twitter: "https://twitter.com/winterwarmthinitiative",
    },
    usersDonated: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    ngoType: "Charity & Welfare",
    totalDonationsMade: 5000,
    isApproved: false,
  },
];

// Insert sample data into the database
const operations = sampleNGOs.map((ngo) => ({
  insertOne: { document: ngo },
}));

try {
  await mongoose.connect('mongodb+srv://sam113273:nu2Lnj8sHCAMPWVB@donate.p64ft.mongodb.net/?retryWrites=true&w=majority&appName=donate', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,  // increase timeout to 30 seconds
    socketTimeoutMS: 45000,          // Set socket timeout for queries
  });

  await NGO.bulkWrite(operations);
  console.log("Sample NGO data inserted successfully!");
} catch (error) {
  console.error("Error inserting sample data:", error);
} finally {
  mongoose.connection.close();
}
