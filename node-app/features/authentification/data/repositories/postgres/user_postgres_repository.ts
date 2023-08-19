import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../domain/respositories/user_repository';
import { Pool } from 'pg';  // Assuming you're using 'pg' for PostgreSQL.

export class UserPostgresRepository implements UserRepository {
    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        return result.rows[0];  // Simplified. You might need to map DB results to the User entity.
    }

    async createUser(user: User): Promise<User> {
        const result = await this.db.query(
            'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
            [user.email, user.password]
        );
        
        return result.rows[0];  // Simplified. Again, consider mapping.
    }

    // Implement other methods from the UserRepository interface as needed.
}
