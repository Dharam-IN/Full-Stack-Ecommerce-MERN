import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.MONGO_URL;

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(DB)
        console.log("Database Connected")
    } catch (error) {
        console.log(`Error fetch in database ${error}`)
    }
}

export default connectDB;