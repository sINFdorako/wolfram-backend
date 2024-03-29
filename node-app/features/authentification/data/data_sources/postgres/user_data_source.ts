import { User as DomainUser, UserRole } from '../../../domain/entities/user';
import { User } from './models/user.model'; // Ensure this path is correct

export class UserDataSource {

    async getUserByEmailFromDB(email: string): Promise<DomainUser | null> {
        const user = await User.findOne({ where: { email } });
        if (user) {
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role,
                company: user.company ?? null,
                position: user.position ?? null,
                registered: user.createdAt ?? null,
                lastLogin: user.lastLogin ?? null,
                prename: user.prename ?? null,
                surname: user.surname ?? null
            };
        }
        return null;
    }

    async createUserOnDB(domainUser: DomainUser): Promise<DomainUser> {
        const newUser = {
            email: domainUser.email,
            password: domainUser.password,
            role: domainUser.role,
            apiKey: domainUser.apiKey,
            company: domainUser.company,
            position: domainUser.position,
            registered: domainUser.registered,
            lastLogin: domainUser.lastLogin,
            prename: domainUser.prename ?? null,
            surname: domainUser.surname ?? null
        };

        const user = await User.create(newUser);

        return {
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role as UserRole,
            apiKey: user.apiKey,
            company: user.company,
            position: user.position,
            registered: user.createdAt,
            lastLogin: user.lastLogin,
            prename: user.prename,
            surname: user.surname

        };
    }

    async getUserByIdFromDB(id: number): Promise<DomainUser | null> {
        const user = await User.findByPk(id);
        if (user) {
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role,
                company: user.company ?? null,
                position: user.position ?? null,
                registered: user.createdAt ?? null,
                lastLogin: user.lastLogin ?? null,
                prename: user.prename ?? null,
                surname: user.surname ?? null
            };
        }
        return null;
    }

    async updateUserInDB(domainUser: DomainUser): Promise<DomainUser> {
        const userToUpdate = await User.findByPk(domainUser.id);
        if (!userToUpdate) {
            throw new Error('User not found');
        }

        userToUpdate.email = domainUser.email ?? userToUpdate.email;
        userToUpdate.password = domainUser.password ?? userToUpdate.password;
        userToUpdate.role = domainUser.role ?? userToUpdate.role;
        userToUpdate.company = domainUser.company ?? userToUpdate.company;
        userToUpdate.position = domainUser.position ?? userToUpdate.position;
        userToUpdate.lastLogin = domainUser.lastLogin ?? userToUpdate.lastLogin;
        userToUpdate.prename = domainUser.prename ?? userToUpdate.prename;
        userToUpdate.surname = domainUser.surname ?? userToUpdate.surname;

        await userToUpdate.save();

        return {
            id: userToUpdate.id,
            email: userToUpdate.email,
            password: userToUpdate.password,
            role: userToUpdate.role,
            company: userToUpdate.company,
            position: userToUpdate.position,
            registered: userToUpdate.createdAt,
            lastLogin: userToUpdate.lastLogin,
            prename: userToUpdate.prename,
            surname: userToUpdate.surname
        };
    }

    async updateApiKey(userId: number, apiKeyHashed: string): Promise<void> {
        const userToUpdate = await User.findByPk(userId);
        if (!userToUpdate) {
            throw new Error('User not found');
        }

        if (apiKeyHashed) {
            userToUpdate.apiKey = apiKeyHashed;
        }

        await userToUpdate.save();
    }
}
