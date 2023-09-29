import { ICategoryRepository } from "../repositories/icategory_repository";

export class DeleteCategories {
    constructor(private categoryRepository: ICategoryRepository) {};

    async execute(userId: number, categoryIds: number[]) : Promise<void> {
        await this.categoryRepository.deleteCategories(userId, categoryIds);
    }
}