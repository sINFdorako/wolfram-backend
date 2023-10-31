import Category from "../entities/category";
import { CategoryRepository } from "../repositories/category_repository";

export class GetAllCategoriesByUser {
    constructor(private icategoryRepository: CategoryRepository) {}

    async execute(userId: number): Promise<Category[] | null> {
        const categories = await this.icategoryRepository.getAllCategoriesByUser(userId);
        return categories;
    }
}