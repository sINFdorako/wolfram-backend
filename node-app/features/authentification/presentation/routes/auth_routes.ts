import { Router } from 'express';
import { AuthController } from '../controllers/auth_controller';
import { LoginUser } from '../../domain/usecases/login_user';
import { UserPostgresRepository } from '../../data/repositories/postgres/user_postgres_repository';
import { Pool } from 'pg';

const router = Router();

// Create new PostgreSQL pool.
const db = new Pool({
    // db configurations here
});

// Initialize UserRepository implementation (UserPostgresRepository).
const userRepository = new UserPostgresRepository(db);

// Initialize use case with the repository.
const loginUser = new LoginUser(userRepository);

// Inject use case to the AuthController.
const authController = new AuthController(loginUser);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login.bind(authController)); 

export default router;
