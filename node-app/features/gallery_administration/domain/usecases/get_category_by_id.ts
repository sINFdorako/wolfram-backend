import Category from "../entities/category";
import { CategoryRepository } from "../repositories/category_repository";

export class GetCategoryById {
    constructor(private icategoryRepository: CategoryRepository) {}

    async execute(userId: number, categoryId: number): Promise<Category | null> {
        const category = await this.icategoryRepository.getCategoryById(categoryId, userId);
        return category;
    }
}