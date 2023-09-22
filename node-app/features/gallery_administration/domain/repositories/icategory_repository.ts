import Category from "../entities/category";

export interface ICategoryRepository {
    createCategory(userId: number, name: string, description?: string): Promise<Category>;
  }
  