import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Model/User.model.js';

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