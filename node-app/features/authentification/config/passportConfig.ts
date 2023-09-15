import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '../domain/respositories/user_repository';

export function configurePassport(userRepository: UserRepository) {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await userRepository.getUserByEmail(username);
                
                if (!user) {
                    return done(null, false, { message: 'Falscher Benutzername.' });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                
                if (!isPasswordValid) {
                    return done(null, false, { message: 'Falsches Passwort.' });
                }
                
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));
}
