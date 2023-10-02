import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginUser } from '../../domain/usecases/login_user';
import { RegisterUser } from '../../domain/usecases/register_user';
import { GetUserById } from '../../domain/usecases/get_user_by_id';
import bcrypt from 'bcrypt';
import { UpdateUser } from '../../domain/usecases/update_user';
import { UpdateApiKey } from '../../domain/usecases/update_api_key';
import crypto from 'crypto';
import { HashApiKey } from '../../domain/usecases/hash_api_key';

export class AuthController {
    constructor(private loginUser: LoginUser, private registerUser: RegisterUser, private getUserById: GetUserById, private updateUser: UpdateUser, private updateApiKey: UpdateApiKey) { }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.loginUser.execute(email, password);

            // If user is null or undefined, it means the credentials are incorrect.
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const secretKey = process.env.JWT_SECRET;

            if (!secretKey) {
                throw new Error('JWT_SECRET is not defined in the environment variables');
            }

            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, {
                expiresIn: '3h'
            });

            res.json({ token });

        } catch (error) {
            console.error(error); // Log the error for debugging.
            res.status(500).json({ error: 'An error occurred during authentication' });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
    
            // Validate input (basic example; consider using a library for robust validation)
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await this.registerUser.execute(email, hashedPassword);
    
            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                throw new Error('JWT_SECRET is not defined in the environment variables');
            }
    
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, {
                expiresIn: '3h'
            });
    
            res.json({ token });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during registration' });
        }
    }

    getUserByIdHandler = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }

            const userId = req.user?.id;

            const user = await this.getUserById.execute(userId);

            if(!user) {
                return res.status(404).send({message: 'No user found'})
            }

            res.status(200).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'An error occured during find user by id', error: error})
        }
    }

    updateUserRole = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            
            const userId = req.user?.id;
            
            const { role } = req.body;

            const user = await this.getUserById.execute(userId);

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            user.role = role; 

            await this.updateUser.execute(user); 

            res.status(200).send({ message: 'Role updated successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to update user role', error });
        }
    }

    handleApiKey = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }

            const apiKey = crypto.randomBytes(32).toString('hex');
            const hashKey: HashApiKey = new HashApiKey(apiKey);
            const apiKeyHashed = hashKey.execute();
            
            const userId = req.user?.id;

            await this.updateApiKey.execute(userId, apiKeyHashed);
            
            res.status(200).send({ apiKey, message: 'Success' });

        } catch (error) {
            console.log(error);
            res.status(500).send({message: 'Failed to update Api Key'});
        }
    }
    
}
