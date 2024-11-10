import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Model/User.model.js";
import NGO from "../Model/Ngo.model.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { name, mobileno, email, password, address, country, state, role } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      mobileno,
      email,
      password: hashedPassword,
      address,
      country,
      state,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const ngoRegister = async (req, res) => {
  const {
    ngoname,
    registrationNumber,
    address,
    description,
    email,
    password,
    ngoType,
    thingsRequired,
  } = req.body;

  // Validate required fields
  if (
    !ngoname ||
    !registrationNumber ||
    !address ||
    !email ||
    !password ||
    !ngoType
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  // Log received data for debugging
  console.log("Received data:", req.body);

  try {
    // Check for existing NGO with the same email
    const existingNgo = await NGO.findOne({ email });
    console.log("Existing NGO by email:", existingNgo);

    // If NGO with email already exists, return error
    if (existingNgo) {
      return res
        .status(400)
        .json({ message: "NGO with this email already exists" });
    }

    // Check for existing NGO with the same registration number
    const existingNgoByRegNumber = await NGO.findOne({ registrationNumber });
    console.log("Existing NGO by registration number:", existingNgoByRegNumber);

    // If NGO with registration number already exists, return error
    if (existingNgoByRegNumber) {
      return res
        .status(400)
        .json({ message: "NGO with this registration number already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hashedPassword);

    // Create a new NGO instance
    const newNgo = new NGO({
      ngoname,
      registrationNumber,
      address,
      description,
      email,
      password: hashedPassword,
      ngoType,
      thingsRequired,
    });

    // Save the new NGO to the database
    await newNgo.save();
    console.log("New NGO saved successfully");

    // Respond with success message
    res.status(201).json({ message: "NGO registered successfully" });
  } catch (error) {
    console.error("Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let existingUser = await User.findOne({ email });
    let isPasswordCorrect = false;
    let role = '';

    // If no user found, check for NGO
    if (!existingUser) {
      existingUser = await NGO.findOne({ email });
      role = 'ngo'; // Assign "ngo" role if NGO is found
    } else {
      role = existingUser.role || 'user'; // Default to "user" if not a specific role
    }

    // If neither user nor NGO found
    if (!existingUser) {
      return res.status(404).json({ message: "Profile does not exist" });
    }

    // Check password for both user and NGO
    isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate the JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login successful", token, role ,id: existingUser._id});

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};