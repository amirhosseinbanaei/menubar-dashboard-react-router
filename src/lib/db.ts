import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }

    await mongoose.connect("mongodb://127.0.0.1:27017/menubar");
    console.log("Connected to db succesfully");
  } catch (error) {
    console.log("Cant connect to db =>", error);
  }
};

export default connectToDB;
