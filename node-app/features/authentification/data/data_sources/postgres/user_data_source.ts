import { User as DomainUser, UserRole } from '../../../domain/entities/user';
import { User } from './models/user.model'; // Stellen Sie sicher, dass dieser Pfad korrekt ist

export class UserDataSource {

    async getUserByEmailFromDB(email: string): Promise<DomainUser | null> {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role
            };
        }
        return null;
    }

    async createUserOnDB(domainUser: DomainUser): Promise<DomainUser> {
        const user = await User.create({ email: domainUser.email, password: domainUser.password });
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role
        };
    }

    async getUserByIdFromDB(id: number): Promise<DomainUser | null> {
        const user = await User.findByPk(id);
        if(user) {
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role
            }
        }
        return null;
    }

    async updateUserInDB(domainUser: DomainUser): Promise<DomainUser> {
        const userToUpdate = await User.findByPk(domainUser.id);
        if (!userToUpdate) {
            throw new Error('User not found');
        }
    
        // Nur aktualisieren, wenn der Wert bereitgestellt wird
        if (domainUser.email) {
            userToUpdate.email = domainUser.email;
        }
    
        if (domainUser.password) {
            userToUpdate.password = domainUser.password;
        }

        if(domainUser.role) {
            userToUpdate.role = domainUser.role;
        }
    
        await userToUpdate.save(); // Änderungen speichern
    
        return {
            id: userToUpdate.id,
            email: userToUpdate.email,
            password: userToUpdate.password,
            role: userToUpdate.role
        };
    }
    

}
