import Category from "../entities/category";
import { ICategoryRepository } from "../repositories/icategory_repository";

export class UpdateCategory {
    constructor(private categoryRepository: ICategoryRepository) {};

    async execute(userId: number, title: string, categoryId: number,  description?: string): Promise<Category> {
        return await this.categoryRepository.updateCategory(userId, title, categoryId, description ?? '');
    }
}