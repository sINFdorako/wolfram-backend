import express from 'express';
import { LoginUser } from '../../domain/usecases/login_user';
import { UserRepository } from '../../domain/respositories/user_repository';
import { UserPostgresRepository } from '../../data/repositories/postgres/user_postgres_repository';
import { UserDataSource } from '../../data/data_sources/postgres/user_data_source';
import { RegisterUser } from '../../domain/usecases/register_user';
import { AuthController } from '../controllers/auth_controller';
import { Request, Response } from 'express';
import { GetUserById } from '../../domain/usecases/get_user_by_id';
import { ensureAuthenticated, isSelfOrSuperAdmin, isSuperAdmin } from '../middlewares/auth_middleware';
import { UpdateUser } from '../../domain/usecases/update_user';
import { UpdateApiKey } from '../../domain/usecases/update_api_key';

// Ein UserRepository erstellen (über ein konkretes Repository wie UserPostgresRepository)
const dataSource = new UserDataSource();
const userRepo: UserRepository = new UserPostgresRepository(dataSource);

// Den Usecase initialisieren
const loginUser: LoginUser = new LoginUser(userRepo);
const registerUser: RegisterUser = new RegisterUser(userRepo);
const getUserById: GetUserById = new GetUserById(userRepo);
const updateUser: UpdateUser = new UpdateUser(userRepo);
const updateApiKey: UpdateApiKey = new UpdateApiKey(userRepo);

const router = express.Router();

const authController = new AuthController(loginUser, registerUser, getUserById, updateUser, updateApiKey);

// Login post Route
router.post('/login', authController.login);

// Login get Route
router.get('/login', (req: Request, res: Response) => {
    res.render('login');
})

// Login post Route
router.post('/register', authController.register);

// register get route
router.get('/register', (req: Request, res: Response) => {
    res.render('register')
})

// Benutzer ist authentifiziert und entweder der Benutzer selbst oder ein Superadmin kann auf user zugreifen
router.get('/user', ensureAuthenticated, authController.getUserByIdHandler);

// Nur Superadmin kann den Benutzer aktualisieren
router.put('/user/update-role', ensureAuthenticated, isSuperAdmin, authController.updateUserRole);

router.post('/generate-api-key', ensureAuthenticated, authController.handleApiKey) 

export default router;
