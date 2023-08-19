import { Pool } from 'pg';
import { User } from '../../../domain/entities/user';

export class UserDataSource {
    private db: Pool;

    constructor() {
        this.db = new Pool({
            // your db configurations here, like:
            // user: 'your_username',
            // host: 'localhost',
            // database: 'your_database_name',
            // password: 'your_password',
            // port: 5432,
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const result = await this.db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    
            if (result.rows.length === 0) {
                return null;  // No user found with this email.
            }
    
            const userRow = result.rows[0];
            return {
                id: userRow.id,
                email: userRow.email,
                password: userRow.password // Assuming the table has a password column.
            };
        } catch (err) {
            if (err instanceof Error) {
                throw new Error('Failed to fetch user from database: ' + err.message);
            } else {
                throw err;  // Re-throw if it's not an instance of Error.
            }
        }
    }
    // other CRUD functions...
}
