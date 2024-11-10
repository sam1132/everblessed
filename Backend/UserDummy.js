import mongoose from 'mongoose';
import User from './Model/User.model.js'; // Import the User model
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

// Function to generate random users
async function generateUsers() {
  try {
    const users = [];

    // Create 100+ users (let's generate 100 users for now)
    for (let i = 0; i < 100; i++) {
      const user = {
        name: faker.name.findName(),
        mobileno: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: faker.address.streetAddress(),
        country: faker.address.country(),
        state: faker.address.state(),
        role: faker.random.arrayElement(['user', 'ngo']), // Randomly assign the role
        donations: [], // You can leave this empty for now or later populate with donations
      };

      users.push(user);
    }

    // Insert the generated users into the MongoDB database
    await User.insertMany(users);
    console.log("100+ users generated and inserted into the database.");
  } catch (error) {
    console.error("Error generating users:", error);
  }
}

// Call the function to generate and insert data
generateUsers();
