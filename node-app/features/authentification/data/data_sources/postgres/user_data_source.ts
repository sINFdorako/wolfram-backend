import { Pool } from 'pg';
import { User } from '../../../domain/entities/user';

export class UserDataSource {
    private db: Pool;

    constructor() {
        this.db = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT as string, 10) // convert the port from string to number
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
