import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
  } try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log("Error in utils/database.js");
    console.log(error.message);
  }
};
