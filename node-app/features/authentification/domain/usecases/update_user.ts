import { User } from "../entities/user";
import { UserRepository } from "../respositories/user_repository";

export class UpdateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(userToUpdate: User): Promise<User> {
        // Check if user with the given ID exists
        if (!userToUpdate.id) {
            throw new Error('User ID must be provided for update');
        }

        const existingUser = await this.userRepository.getUserById(userToUpdate.id);

        if(!existingUser) {
            throw new Error('User not found');
        }

        return await this.userRepository.updateUser(userToUpdate);
    }
}