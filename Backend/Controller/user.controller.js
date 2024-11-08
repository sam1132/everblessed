import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Model/User.model.js';

export const register = async (req, res) => {
  const { name, mobileno, email, password, address, country, state, role } = req.body;
  try {
    const userExists = await User.create({ name, mobileno, email, password, address, country, state, role });
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}