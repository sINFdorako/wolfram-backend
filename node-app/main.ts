import express, { Request, Response } from 'express';
import authRoutes from './features/authentification/presentation/routes/auth_routes'
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: '../.env' });

const app: express.Application = express();
const port: number = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './features/authentification/presentation/views')); 

app.get('/', (req: Request, res: Response) => {
    res.send('Admin Panel - Fotogalerie Wolfram Wildner');
});

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
