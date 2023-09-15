import { User } from '../entities/user';
import { UserRepository } from '../respositories/user_repository';
import * as bcrypt from 'bcrypt';

export class LoginUser {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    }
}
