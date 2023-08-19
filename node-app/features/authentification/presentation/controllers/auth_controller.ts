import { Request, Response } from 'express';
import { LoginUser } from '../../domain/usecases/login_user';

export class AuthController {
    constructor(private loginUser: LoginUser) {}

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.loginUser.execute(email, password);
            // Handle successful login.
            // Perhaps generate JWT or set a session.
        } catch (error) {
            // Handle errors.
        }
    }
}
