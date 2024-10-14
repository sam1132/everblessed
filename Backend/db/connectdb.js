import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const connectDB = async () => {
  try {
  const connectionInstance =   await mongoose.connect(uri);
    console.log(`MongoDB connection success : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed",error);
    process.exit(1);
  }
}

export default connectDB;