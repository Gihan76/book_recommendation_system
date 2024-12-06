import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const signUp = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = new User({ email, username, password });
        await user.save();

        const token = jwt.sign({ id: user?._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'User already exists or invalid data!' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ error: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user?.password);
        if(!isMatch) return res.status(400).json({ error: 'Incorrect password!' });

        const token = jwt.sign({ id: user?._id, email: user?.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};