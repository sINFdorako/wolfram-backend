import Category from "../entities/category";

export interface ICategoryRepository {
    createCategory(userId: number, name: string, description?: string): Promise<Category>;
    getCategoryById(userId: number, categoryId: number): Promise<Category | null>;
    getAllCategoriesByUser(userId: number): Promise<Category[] | null>;
    updateCategory(userId: number, categoryId: number, name: string, description?: string): Promise<Category>;
    deleteCategories(userId: number, categoryIds: number[]): Promise<void>;
  }
  