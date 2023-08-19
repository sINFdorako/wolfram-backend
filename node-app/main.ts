import express, { Request, Response } from 'express';
import authRoutes from './features/authentification/presentation/routes/auth_routes'

const app: express.Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Admin Panel - Fotogalerie Wolfram Wildner');
});

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
