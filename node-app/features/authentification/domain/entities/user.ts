export enum UserRole {
    USER = 'user',
    SUPERADMIN = 'superadmin'
}
export class User {
    email: string;
    password: string;
    id?: number;
    role?: UserRole;
    apiKey?: string | null;
    company?: string | null;
    position?: string | null;
    registered?: Date | null;
    lastLogin?: Date | null;
    prename?: string | null;
    surname?: string | null;

    constructor({
        email,
        password,
        role,
        id,
        apiKey,
        company,
        position,
        registered,
        lastLogin,
        prename,
        surname
    }: {
        email: string;
        password: string;
        role?: UserRole;
        id?: number;
        apiKey?: string | null;
        company?: string | null;
        position?: string | null;
        registered?: Date | null;
        lastLogin?: Date | null;
        prename?: string | null;
        surname?: string | null;
    }) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.id = id;
        this.apiKey = apiKey;
        this.company = company;
        this.position = position;
        this.registered = registered;
        this.lastLogin = lastLogin;
        this.prename = prename;
        this.surname = surname;
    }
}


