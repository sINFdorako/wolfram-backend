import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginUser } from '../../domain/usecases/login_user';
import { RegisterUser } from '../../domain/usecases/register_user';
import bcrypt from 'bcrypt';

export class AuthController {
    constructor(private loginUser: LoginUser, private registerUser: RegisterUser) { }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.loginUser.execute(email, password);

            // If user is null or undefined, it means the credentials are incorrect.
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            const secretKey = process.env.JWT_SECRET;

            if (!secretKey) {
                throw new Error('JWT_SECRET is not defined in the environment variables.');
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
                expiresIn: '1h'
            });

            res.json({ token });

        } catch (error) {
            console.error(error); // Log the error for debugging.
            res.status(500).json({ error: 'An error occurred during authentication.' });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
    
            // Validate input (basic example; consider using a library for robust validation)
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required.' });
            }
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await this.registerUser.execute(email, hashedPassword);
    
            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                throw new Error('JWT_SECRET is not defined in the environment variables.');
            }
    
            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
                expiresIn: '1h'
            });
    
            res.json({ token });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during registration.' });
        }
    }
    
}
