import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Category } from './features/gallery_administration/data/data_sources/postgres/models/category.model';
import { Image } from './features/gallery_administration/data/data_sources/postgres/models/image.model';
import authRoutes from './features/authentification/presentation/routes/auth_routes'
import categoryRoutes from './features/gallery_administration/presentation/routes/category_routes';
import { UserPostgresRepository } from './features/authentification/data/repositories/postgres/user_postgres_repository'
import { UserDataSource } from './features/authentification/data/data_sources/postgres/user_data_source';
import { configurePassport } from './features/authentification/config/passportConfig';
import { sequelize } from './core/database_config/database';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app: express.Application = express();
const port: number = 3000;

const userDataSource = new UserDataSource();
const userRepository = new UserPostgresRepository(userDataSource);

configurePassport(userRepository);
app.use(passport.initialize());

// body-parser Middleware
app.use(bodyParser.json()); // Unterstützung für JSON-Request-Bodies
app.use(bodyParser.urlencoded({ extended: true })); // Unterstützung für URL-codierte Request-Bodies

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './features/authentification/presentation/views')); 

app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);

// Synchronisieren der Modelle mit der Datenbank
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}).catch(err => {
    console.error('Failed to synchronize database:', err);
});
