import { ICategoryRepository } from '../../domain/repositories/icategory_repository';
import { Category } from '../models/category.model';
import { Op } from 'sequelize';

export class CategoryRepository implements ICategoryRepository {
  async updateCategory(userId: number, name: string, categoryId: number,  description?: string | undefined): Promise<Category> {
    const category = await Category.findOne({
        where: {
            userId: userId,
            id: categoryId
        }
    });

    // If no category was found, throw an error
    if (!category) {
        throw new Error('Category not found.');
    }

    // Update the category's name and description
    category.name = name;
    if (description !== undefined) { // Check if the description was provided
        category.description = description;
    }

    // Save the changes to the database
    await category.save();

    return category;
}


  async deleteCategories(userId: number, categoryIds: number[]): Promise<void> {
    await Category.destroy({
      where: {
        userId: userId,
        id: {
          [Op.in]: categoryIds
        }
      }
    });
  }

  async getAllCategoriesByUser(userId: number): Promise<Category[] | null> {
    const categories = await Category.findAll({ where: { userId } });
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
