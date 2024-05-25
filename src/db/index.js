import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbconnect = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log('MongoDB Error:: Cannot connect to the Database');
        process.exit(1);
    }
}

export default dbconnect;