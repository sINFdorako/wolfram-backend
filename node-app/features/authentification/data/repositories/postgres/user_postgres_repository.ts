import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../domain/respositories/user_repository';
import { UserDataSource } from '../../data_sources/postgres/user_data_source';

export class UserPostgresRepository implements UserRepository {
    private dataSource: UserDataSource;

    constructor(dataSource: UserDataSource) {
        this.dataSource = dataSource;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const userData = await this.dataSource.getUserByEmailFromDB(email);
        if (!userData) {
            return null;
        }
        return new User( userData.email, userData.password, userData.id);
    }

    async createUser(user: User): Promise<User> {
        const newUser = await this.dataSource.createUserOnDB(user);
        return new User( newUser.email, newUser.password, newUser.id);
    }
}
