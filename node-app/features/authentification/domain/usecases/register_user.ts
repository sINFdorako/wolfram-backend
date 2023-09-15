import { User } from '../entities/user';
import { UserRepository } from '../respositories/user_repository';

export class RegisterUser {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<User> {
        // Check if user with this email already exists
        const existingUser = await this.userRepository.getUserByEmail(email);
        
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create a new user
        const newUser = new User(email, password);
        return await this.userRepository.createUser(newUser);
    }
}
