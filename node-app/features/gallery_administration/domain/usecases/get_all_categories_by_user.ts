import Category from "../entities/category";
import { ICategoryRepository } from "../repositories/icategory_repository";

export class getAllCategoriesByUser {
    constructor(private icategoryRepository: ICategoryRepository) {}

    async execute(userId: number): Promise<Category[] | null> {
        const categories = await this.icategoryRepository.getAllCategoriesByUser(userId);
        return categories;
    }
}