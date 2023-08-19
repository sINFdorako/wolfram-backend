import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginUser } from '../../domain/usecases/login_user';

export class AuthController {
    constructor(private loginUser: LoginUser) {}

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.loginUser.execute(email, password);

            // If user is null or undefined, it means the credentials are incorrect.
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            // Handle successful login.
            const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // It's better to store secret keys in .env files.
            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
                expiresIn: '1h' // Token expiration time. Adjust as needed.
            });

            res.json({ token });

        } catch (error) {
            console.error(error); // Log the error for debugging.
            res.status(500).json({ error: 'An error occurred during authentication.' });
        }
    }

    public getLoginPage(req: Request, res: Response): void {
        res.render('login');
    }
}
