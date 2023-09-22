import { UserRepository } from "../respositories/user_repository";
import { User } from "../entities/user";

export class GetUserById {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: number): Promise<User | null> {
        return await this.userRepository.getUserById(userId);
    }
}