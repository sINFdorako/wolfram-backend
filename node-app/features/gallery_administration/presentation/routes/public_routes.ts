import express from 'express';
import { CategoryRepository } from '../../data/repositories/category_repository_impl';
import { ensureApiKey } from '../../../authentification/presentation/middlewares/auth_middleware';
import { GetAllCategoriesByUser } from '../../domain/usecases/get_all_categories_by_user';
import { Request, Response } from 'express';
import { ImageRepositoryImpl } from '../../data/repositories/image_repository_impl';
import { GetImagesByUserAndCategory } from '../../domain/usecases/get_images_by_user_and_category';
import { ImageDataSource } from '../../data/data_sources/image_data_source';

const categoryRepository = new CategoryRepository();
const imageDataSource = new ImageDataSource();
const imageRepository = new ImageRepositoryImpl();
const getAllCategoriesByUser = new GetAllCategoriesByUser(categoryRepository);
const getImagesByUserAndCategory = new GetImagesByUserAndCategory(imageRepository);

const router = express.Router();

router.get('/get-all-categories', ensureApiKey, async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(400).send({ message: 'User ID is missing' });
  }

  const userId = req.user.id;

  const category = await getAllCategoriesByUser.execute(userId);

  if (!category) {
    return res.status(404).send({ message: 'Category not found.' });
  }

  res.send(category);
});


router.get('/category-images/:categoryId', ensureApiKey, async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).send({ message: 'User ID is missing' });
    }

    const userId = req.user.id;
    const categoryId = Number(req.params.categoryId);

    const images = await getImagesByUserAndCategory.execute(userId, categoryId);

    if (!images || images.length === 0) {
      return res.status(404).send({ message: 'No images found for this user and category' });
    }

    res.send(images);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred when fetching the images.', error });
  }
});

export default router;