import { UserRepository } from "../respositories/user_repository";

export class UpdateApiKey {
    constructor(private userRepository: UserRepository){};

    async execute(userId: number, apiKeyHashed: string) : Promise<void> {
         await this.userRepository.updateApiKey(userId, apiKeyHashed);
    }
}