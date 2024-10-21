import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectdb.js';
import User from './Model/User.model.js';
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();
async function createUser() {
    try {
      const newUser = await User.create({
        name: 'John Doe',
        mobileno: '1234567890',
        email: 'johndoe@example.com',
        password: 'password123',
        address: '123 Main Street',
        country: 'USA',
        state: 'California',
        role: 'user',
        pastdonations: [],  
        recentdonation: null, 
      });
  
      console.log('User created successfully:', newUser);
    } catch (err) {
      console.error('Error creating user:', err);
    }
  }
  
  // Call the function to create the user
  createUser();
app.use(express.json());
app.use(cors());
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});