import { User as DomainUser } from '../../../domain/entities/user';
import { User } from './models/user.model'; // Stellen Sie sicher, dass dieser Pfad korrekt ist

export class UserDataSource {

    async getUserByEmailFromDB(email: string): Promise<DomainUser | null> {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return {
                id: user.id,
                email: user.email,
                password: user.password
            };
        }
        return null;
    }

    async createUserOnDB(domainUser: DomainUser): Promise<DomainUser> {
        const user = await User.create({ email: domainUser.email, password: domainUser.password });
        return {
            id: user.id,
            email: user.email,
            password: user.password
        };
    }

}
