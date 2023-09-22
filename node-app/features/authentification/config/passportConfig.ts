import passport from 'passport';
import { UserRepository } from '../domain/respositories/user_repository';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export function configurePassport(userRepository: UserRepository) {
    passport.use(new JWTStrategy(jwtOptions, async (jwtPayload: any, done: any) => {
        try {
            const user = await userRepository.getUserById(jwtPayload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));
}
