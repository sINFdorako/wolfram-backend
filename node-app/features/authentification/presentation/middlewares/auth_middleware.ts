import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';

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
    if (req.user && (req.user.id === parseInt(req.params.id, 10) || req.user.role === 'superadmin')) {
        return next();
    }
    res.status(403).send('Permission denied');
}
