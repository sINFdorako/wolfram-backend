import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../domain/respositories/user_repository';
import { UserDataSource } from '../../data_sources/postgres/user_data_source';

export class UserPostgresRepository implements UserRepository {
    private dataSource: UserDataSource;

    constructor(dataSource: UserDataSource) {
        this.dataSource = dataSource;
    }
    async updateApiKey(userId: number, apiKeyHashed: string): Promise<void> {
        return await this.dataSource.updateApiKey(userId, apiKeyHashed);
    }
    async updateUser(user: User): Promise<User> {
        return await this.dataSource.updateUserInDB(user);
    }
    async getUserById(id: number): Promise<User | null> {
        const userData = await this.dataSource.getUserByIdFromDB(id);
        if (!userData) {
            return null;
        }
        return new User({ email: userData.email, password: userData.password, company: userData.company, position: userData.position, registered: userData.registered, lastLogin: userData.lastLogin, role: userData.role, id: userData.id, prename: userData.prename, surname: userData.surname });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const userData = await this.dataSource.getUserByEmailFromDB(email);
        if (!userData) {
            return null;
        }
        return new User({ email: userData.email, password: userData.password, company: userData.company, position: userData.position, registered: userData.registered, lastLogin: userData.lastLogin, role: userData.role, id: userData.id, prename: userData.prename, surname: userData.surname });
    }

    async createUser(user: User): Promise<User> {
        const userData = await this.dataSource.createUserOnDB(user);
        return new User({ email: userData.email, password: userData.password, company: userData.company, position: userData.position, registered: userData.registered, lastLogin: userData.lastLogin, role: userData.role, id: userData.id, prename: userData.prename, surname: userData.surname });
    }
}
