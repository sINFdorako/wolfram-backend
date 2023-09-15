import { User } from '../entities/user';

export interface UserRepository {
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
}
