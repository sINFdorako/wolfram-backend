import express from 'express';
import { CreateCategory } from '../../domain/usecases/create_category';
import { CategoryRepository } from '../../data/repositories/category_repository';
import { ensureAuthenticated } from '../../../authentification/presentation/middlewares/auth_middleware';
import { Request, Response } from 'express';
import { Jwt } from 'jsonwebtoken';

const categoryRepository = new CategoryRepository();
const createCategoryUsecase = new CreateCategory(categoryRepository);

const router = express.Router();

import jwt from 'jsonwebtoken';

router.post('/create', ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    // Extract the JWT token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];  // Extract token from "Bearer TOKEN"

    // Verify and decode the token
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).send({ message: 'Server configuration error' });
    }

    const decodedPayload = jwt.verify(token, secretKey) as any;  

    const userId = decodedPayload.id;  

    const { name, description } = req.body;
    const newCategory = await createCategoryUsecase.execute(userId, name, description);
    res.status(201).send(newCategory);

  } catch (error) {
    res.status(500).send({ message: 'Error creating category', error });
  }
});


export default router;
