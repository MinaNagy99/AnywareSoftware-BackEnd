import { config } from "dotenv";
import mongoose from "mongoose";
config()
export const dbConnection = mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connection to MongoDB is successful");
  })
  .catch((err) => {
    console.log(process.env.MONGODB_URI);
    console.error("Error connecting to MongoDB:", err);
  });

  