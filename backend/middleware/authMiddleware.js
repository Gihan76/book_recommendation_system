import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'No token provided!' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded?.id;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token!' });
    }
};

export default authMiddleware;