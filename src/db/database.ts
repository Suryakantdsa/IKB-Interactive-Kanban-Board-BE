import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const URI = process.env.MONGODB_URL;

export const connectDB = async () => {
  if (!URI) {
    throw new Error("MONGODB_URL is not defined ");
  }
  try {
    await mongoose.connect(URI);
    console.log("MongoDb conected sucessfully..!");
  } catch (error) {
    console.error("Mongodb connection error:", error);
    process.exit(1);
  }
};
