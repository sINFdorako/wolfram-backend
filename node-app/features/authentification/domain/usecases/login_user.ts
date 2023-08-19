import { User } from '../entities/user';
import { UserPostgresRepository } from '../../data/repositories/postgres/user_postgres_repository';

export class LoginUser {
    constructor(private userRepository: UserPostgresRepository) {}

    async execute(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        // Simplistic password check. IMPORTANT: Use a library like bcrypt in real-world scenarios.
        if (user.password !== password) {
            throw new Error('Invalid password');
        }

        return user;
    }
}
