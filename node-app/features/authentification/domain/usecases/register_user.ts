import { User } from '../entities/user';
import { UserRepository } from '../respositories/user_repository';

export class RegisterUser {
    constructor(private userRepository: UserRepository) {}

    async execute(newUser: User): Promise<User> {
        // Check if user with this email already exists
        const existingUser = await this.userRepository.getUserByEmail(newUser.email);
        
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create a new user
        return await this.userRepository.createUser(newUser);
    }
}
