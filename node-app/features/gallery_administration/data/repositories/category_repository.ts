import { ICategoryRepository } from '../../domain/repositories/icategory_repository';
import { Category } from '../data_sources/postgres/models/category.model';

export class CategoryRepository implements ICategoryRepository {
  async getAllCategoriesByUser(userId: number): Promise<Category[] | null> {
    const categories = await Category.findAll({ where: {userId}});
    return categories;
  }
  async getCategoryById(userId: number, categoryId: number): Promise<Category | null> {
    const category = await Category.findOne({
      where: {
        id: categoryId,
        userId: userId
      }
    });
    return category;
  }
  async createCategory(userId: number, name: string, description?: string): Promise<Category> {
    const newCategory = await Category.create({ userId, name, description });
    return newCategory;
  }
}
