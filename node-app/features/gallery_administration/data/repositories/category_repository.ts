import { ICategoryRepository } from '../../domain/repositories/icategory_repository';
import { Category } from '../data_sources/postgres/models/category.model';

export class CategoryRepository implements ICategoryRepository {
  async createCategory(userId: number, name: string, description?: string): Promise<Category> {
    const newCategory = await Category.create({ userId, name, description });
    return newCategory;
  }
}
