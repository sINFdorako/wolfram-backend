import Category from "../entities/category";
import { ICategoryRepository } from "../repositories/icategory_repository";

export class UpdateCategory {
    constructor(private categoryRepository: ICategoryRepository) {};

    async execute(userId: number, categoryId: number, title: string, description?: string): Promise<Category> {
        return await this.categoryRepository.updateCategory(userId, categoryId, description ?? '');
    }
}