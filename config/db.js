import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abhisheksingh542005_db_user:aylkoKML22Ey88Ee@cluster0.omia5yv.mongodb.net/user-management-db?retryWrites=true&w=majority";

const connectToMongo = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default connectToMongo;