import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.CONNECTIONS_STRING;
const DB_NAME = process.env.DATABASE;

export const connectToDB = async () => {
    try {
        await mongoose.connect(URI, {
            dbName : DB_NAME
        }).then(() => {
            console.log('Connected to Mongodb Atlas');
        }).catch((err) => {
            console.log("🚀 ~ err mongodb connection:", err);
        })
    } catch (error) {
        console.log("🚀 ~ error:", error);
    }
}