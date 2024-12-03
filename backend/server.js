import { connectToDB } from "./db-config.js";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// mongodb atlas connect
connectToDB();

app.listen(process.env.PORT, () => {
    console.log(`Backend server listening at port ${process.env.PORT}`);
});