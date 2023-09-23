import Category from "../entities/category";
import { ICategoryRepository } from "../repositories/icategory_repository";

export class GetCategoryById {
    constructor(private icategoryRepository: ICategoryRepository) {}

    async execute(userId: number, categoryId: number): Promise<Category | null> {
        const category = await this.icategoryRepository.getCategoryById(categoryId, userId);
        return category;
    }
}