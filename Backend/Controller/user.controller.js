import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Model/User.model.js';

export const register = async (req, res) => {
  const { name, mobileNo, email, password, address, country, state, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, mobileNo, email, password: hashedPassword, address, country, state, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
          return res.status(404).json({ message: "User does not exist" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful", token });
  } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}