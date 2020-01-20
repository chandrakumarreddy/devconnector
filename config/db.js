import mongoose from "mongoose";
import config from "config";

export default async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("conneced to db");
  } catch (error) {
    console.log(error.message);
  }
};
