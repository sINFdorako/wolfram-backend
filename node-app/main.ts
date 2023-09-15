import express, { Request, Response } from 'express';
import authRoutes from './features/authentification/presentation/routes/auth_routes'
import { UserPostgresRepository } from './features/authentification/data/repositories/postgres/user_postgres_repository'
import { UserDataSource } from './features/authentification/data/data_sources/postgres/user_data_source';
import { configurePassport } from './features/authentification/config/passportConfig';
import { sequelize } from './features/authentification/data/data_sources/postgres/database';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app: express.Application = express();
const port: number = 3000;

// body-parser Middleware
app.use(bodyParser.json()); // Unterstützung für JSON-Request-Bodies
app.use(bodyParser.urlencoded({ extended: true })); // Unterstützung für URL-codierte Request-Bodies

const userDataSource = new UserDataSource();
const userRepository = new UserPostgresRepository(userDataSource);

configurePassport(userRepository);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './features/authentification/presentation/views')); 

app.use('/', authRoutes);

// Synchronisieren Sie die Modelle mit der Datenbank
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}).catch(err => {
    console.error('Failed to synchronize database:', err);
});
