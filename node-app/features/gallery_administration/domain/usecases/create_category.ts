import { ICategoryRepository } from '../repositories/icategory_repository';
import Category from '../entities/category';

export class CreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(userId: number, name: string, description?: string): Promise<Category> {
    return this.categoryRepository.createCategory(userId, name, description);
  }
}
