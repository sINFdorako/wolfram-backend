import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../../data/data_sources/postgres/models/user.model';
import { HashApiKey } from '../../domain/usecases/hash_api_key';

export async function ensureApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKeyFromRequest = req.headers['x-api-key'] as string; 

    if (!apiKeyFromRequest) {
        return res.status(400).send({ message: 'API key is missing' });
    }

    const hashKey: HashApiKey = new HashApiKey(apiKeyFromRequest);

    const hashedApiKeyFromRequest = hashKey.execute();

    // Find the user with the corresponding hashed API key
    const user = await User.findOne({ where: { apiKey: hashedApiKeyFromRequest } });

    if (!user) {
        return res.status(401).send({ message: 'Invalid API key' });
    }

    // If you found the user, attach them to the request object
    req.user = user;

    next();
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (error: any, user: any) => {
        if (error) return next(error);
        if (!user) return res.status(401).json({ message: "Not authenticated" });
        req.user = user;
        next();
    })(req, res, next);
}

export function isSuperAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user && req.user.role === 'superadmin') {
        return next();
    }
    res.status(403).send('Permission denied');
}

export function isSelfOrSuperAdmin(req: Request, res: Response, next: NextFunction) {
    console.log(req.user!.id);
    if (req.user && (req.user.id === parseInt(req.params.id, 10) || req.user.role === 'superadmin')) {
        return next();
    }
    res.status(403).send('Permission denied');
}
