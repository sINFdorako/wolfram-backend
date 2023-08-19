import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserDataSource } from '../data/data_sources/postgres/user_data_source'; // Modify the path accordingly

const userRepository = new UserDataSource();

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await userRepository.getUserByEmail(username); // Assuming 'getUserByEmail' is the method name
            
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Here, you should verify the password. Usually, you'd use bcrypt or a similar library.
            const isPasswordValid = await somePasswordCheckFunction(password, user.password); // Placeholder, replace with your actual password validation logic
            
            if (!isPasswordValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Placeholder for password validation logic. In a real scenario, you'd use a library like bcrypt.
async function somePasswordCheckFunction(providedPassword: string, storedPassword: string): Promise<boolean> {
    return providedPassword === storedPassword;
}
