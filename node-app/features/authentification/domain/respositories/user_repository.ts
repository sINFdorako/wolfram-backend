import { User } from '../entities/user';

export interface UserRepository {
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    updateUser(user: User): Promise<User>;
    updateApiKey(userId: number, apiKeyHashed: string): Promise<void>;
}
