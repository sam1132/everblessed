import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String,
         required: true, 
         unique: true 
        },
    password: {
        type: String, 
        required: true },
    address: { 
        type: String, 
        required: true },
    country: { 
        type: String, 
        required: true },
    state: { 
        type: String, 
        required: true 
    },
    pickupLocation: {
      type: String,
      default: '',
  },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", 
      required: true,
    },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
    donationCount: { type: Number, default: 0 },
  },
  
  { timestamps: true }
);
const  User = mongoose.model("User", userSchema);
export default User;
