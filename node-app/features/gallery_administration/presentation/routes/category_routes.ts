import express from 'express';
import { CreateCategory } from '../../domain/usecases/create_category';
import { CategoryRepository } from '../../data/repositories/category_repository';
import { ensureAuthenticated } from '../../../authentification/presentation/middlewares/auth_middleware';
import { GetCategoryById } from '../../domain/usecases/get_category_by_id';
import { GetAllCategoriesByUser } from '../../domain/usecases/get_all_categories_by_user';
import { Request, Response } from 'express';
import { UpdateCategory } from '../../domain/usecases/update_category';
import { DeleteCategories } from '../../domain/usecases/delete_categories';

const categoryRepository = new CategoryRepository();
const createCategoryUsecase = new CreateCategory(categoryRepository);
const getCategoryById = new GetCategoryById(categoryRepository);
const getAllCategoriesByUser = new GetAllCategoriesByUser(categoryRepository);
const updateCategory = new UpdateCategory(categoryRepository);
const deleteCategories = new DeleteCategories(categoryRepository);

const router = express.Router();


router.post('/create', ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).send({ message: 'User ID is missing' });
    }
    const userId = req.user.id;

    const { name, description } = req.body;
    const newCategory = await createCategoryUsecase.execute(userId, name, description);
    res.status(201).send(newCategory);

  } catch (error) {
    res.status(500).send({ message: 'Error creating category', error });
  }
});

router.put('/:categoryId', ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).send({ message: 'User ID is missing' });
    }
    const userId = req.user.id;

    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).send({ message: 'Invalid category ID' });
    }

    const { name, description } = req.body;
    
    // Assuming your use case method also needs the categoryId
    const updatedCategory = await updateCategory.execute(userId, name, categoryId, description);
    
    res.status(200).send(updatedCategory);

  } catch (error) {
    res.status(500).send({ message: 'Error updating category', error });
  }
});


router.delete('/', ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(400).send({ message: 'User ID is missing' });
    }
    const userId = req.user.id;

    // Assuming the category IDs are coming in the body as an array of numbers
    const categoryIds: number[] = req.body.categoryIds;

    if (!categoryIds || categoryIds.length === 0) {
      return res.status(400).send({ message: 'Category IDs are required' });
    }

    await deleteCategories.execute(userId, categoryIds);

    // Return status 204 No Content for successful DELETE operations
    res.status(204).send();

  } catch (error) {
    res.status(500).send({ message: 'Error deleting categories', error });
  }
});


router.get('/:categoryId', ensureAuthenticated, async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(400).send({ message: 'User ID is missing' });
  }

  const userId = req.user.id;
  const categoryId = Number(req.params.categoryId);

  if (isNaN(categoryId)) {
    return res.status(400).send({ message: 'Invalid category ID' });
  }

  const category = await getCategoryById.execute(userId, categoryId);

  if (!category) {
    return res.status(404).send({ message: 'Category not found.' });
  }

  res.send(category);
});

router.get('/', ensureAuthenticated, async (req: Request, res: Response) => {
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

export default router;
