import { CategoryRepository } from "../repositories/category_repository";

export class DeleteCategories {
    constructor(private categoryRepository: CategoryRepository) {};

    async execute(userId: number, categoryIds: number[]) : Promise<void> {
        await this.categoryRepository.deleteCategories(userId, categoryIds);
    }
}