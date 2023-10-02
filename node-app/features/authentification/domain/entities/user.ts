export enum UserRole {
    USER = 'user',
    SUPERADMIN = 'superadmin'
}
export class User {
    email: string;
    password: string;
    id?: number;
    role?: UserRole;
    apiKey?: string;

    constructor(email: string, password: string, role?: UserRole, id?: number, apiKey?: string) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.id = id;
        this.apiKey = apiKey;
    }
}
