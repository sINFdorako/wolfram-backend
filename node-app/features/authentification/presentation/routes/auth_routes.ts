import express from 'express';
import { LoginUser } from '../../domain/usecases/login_user';
import { UserRepository } from '../../domain/respositories/user_repository';
import { UserPostgresRepository } from '../../data/repositories/postgres/user_postgres_repository';
import { UserDataSource } from '../../data/data_sources/postgres/user_data_source';
import { RegisterUser } from '../../domain/usecases/register_user';
import { AuthController } from '../controllers/auth_controller';

// Ein UserRepository erstellen (über ein konkretes Repository wie UserPostgresRepository)
const dataSource = new UserDataSource();
const userRepo: UserRepository = new UserPostgresRepository(dataSource);

// Den Usecase initialisieren
const loginUser: LoginUser = new LoginUser(userRepo);
const registerUser: RegisterUser = new RegisterUser((userRepo));


const router = express.Router();

const authController = new AuthController(loginUser, registerUser);

// Login post Route
router.post('/login', authController.login);

// Login get Route
router.get('/login', (req, res) => {
    res.render('login');
})

// Login post Route
router.post('/register', authController.register);

// register get route
router.get('/register', (req, res) => {
    res.render('register')
})

export default router;
