import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const APP_PORT=parseInt(process.env.APP_PORT, 10) || 4000;

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log("MONGODb ga ulandi");
       
    } catch (error) {
       console.log(error);
       process.exit(1)
    }
   }
   
   export default connectDB;