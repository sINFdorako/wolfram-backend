import express, { Request, Response } from 'express';

const app: express.Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Admin Panel - Fotogalerie Wolfram Wildner');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
