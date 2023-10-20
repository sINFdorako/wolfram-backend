import express from 'express';
import passport from 'passport';
import authRoutes from './features/authentification/presentation/routes/auth_routes';
import settingRoutes from './features/authentification/presentation/routes/fotodesk_setting_routes';
import categoryRoutes from './features/gallery_administration/presentation/routes/category_routes';
import imageRoutes from './features/gallery_administration/presentation/routes/image_routes';
import publicRoutes from './features/gallery_administration/presentation/routes/public_routes';
import landingpageRoutes from './features/landingpage/presentation/routes/landingpage_routes';
import { UserPostgresRepository } from './features/authentification/data/repositories/postgres/user_postgres_repository'
import { UserDataSource } from './features/authentification/data/data_sources/postgres/user_data_source';
import { configurePassport } from './features/authentification/config/passportConfig';
import { sequelize } from './core/database_config/database';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { extractUser } from './core/middleware/extract_user';
import cors from 'cors';
import fs from 'fs';
import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { seedTestUp } from './core/database_config/seeders/seed';
import { setupAssociations } from './core/associations/associations';
dotenv.config();

export const UPLOADS_PATH = path.resolve(__dirname, '..', '/home/uploads');
export const LANDINGPAGE_PATH = path.join(__dirname, './features/gallery_administration/presentation/gallery_user_page/index.html');

const app: express.Application = express();
const port: number = 3000;

app.use(cors());

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
app.use('/fotodesk-setting', extractUser, settingRoutes)
app.use('/category', extractUser, categoryRoutes);
app.use('/image', extractUser, imageRoutes);
app.use('/uploads', express.static(UPLOADS_PATH));
app.use('/public', publicRoutes);
app.use('/landingpage', landingpageRoutes)
app.use('/static', express.static(path.join(__dirname, './features/gallery_administration/presentation/gallery_user_page')));
app.get('/landingpage/:userId', async (req: Request, res: Response) => {
    try {
        fs.readFile(path.join(__dirname, './features/gallery_administration/presentation/gallery_user_page/index.html'), 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Interner Serverfehler');
            }

            res.send(data);
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'An error occurred when fetching landingpage.', error });
    }
});

if (process.env.NODE_ENV === 'test') {
    sequelize.sync({ force: true })
        .then(async () => {
            console.log("Test database synced");
            await seedTestUp(sequelize.getQueryInterface(), Sequelize);  // Seed the database
            console.log("Test database seeded");

            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}/`);
            });
        })
        .catch(err => {
            console.error('Failed to synchronize or seed test database:', err);
        });
} else {
    sequelize.sync()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}/`);
            });
        })
        .catch(err => {
            console.error('Failed to synchronize database:', err);
        });
}
