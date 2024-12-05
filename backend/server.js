import { connectToDB } from "./db-config.js";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Mongodb Atlas Connection
connectToDB();

// Routes
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Backend server listening at port ${PORT}`);
});