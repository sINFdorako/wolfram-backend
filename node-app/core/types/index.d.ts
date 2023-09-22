import { UserRole } from "../../features/authentification/domain/entities/user";

export {};

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: number;
            role: UserRole;
        };
    }
}