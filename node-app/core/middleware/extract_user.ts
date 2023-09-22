import express from 'express';
import jwt from 'jsonwebtoken';

export const extractUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Extract the JWT token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];  // Extract token from "Bearer TOKEN"

    // Verify and decode the token
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        return res.status(500).send({ message: 'Server configuration error' });
    }

    try {
        const decodedPayload = jwt.verify(token, secretKey) as any;
        req.user = { id: decodedPayload.id, role: decodedPayload.role }; 
        next(); 
    } catch (error) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
}
