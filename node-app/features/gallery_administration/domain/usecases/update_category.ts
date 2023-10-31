import Category from "../entities/category";
import { CategoryRepository } from "../repositories/category_repository";

export class UpdateCategory {
    constructor(private categoryRepository: CategoryRepository) {};

    async execute(userId: number, title: string, categoryId: number,  description?: string): Promise<Category> {
        return await this.categoryRepository.updateCategory(userId, title, categoryId, description ?? '');
    }
}