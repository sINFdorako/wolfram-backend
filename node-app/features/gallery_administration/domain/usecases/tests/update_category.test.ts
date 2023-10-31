import { Category } from "../../../data/models/category.model";
import { CategoryRepositoryImpl } from "../../../data/repositories/category_repository_impl";
import { UpdateCategory } from "../update_category";

jest.mock("../../../data/repositories/category_repository_impl.ts");

describe('UpdateCategory', () => {
  let updateCategoryUseCase: UpdateCategory;
  let mockCategoryRepository: jest.Mocked<CategoryRepositoryImpl>;

  const userId = 1;
  const categoryId = 1;
  const title = "Updated Category";
  const description = "Updated Description";

  const updatedCategory: Category = 
    Category.build({
      id: 1,
      userId,
      name: "Category 1",
      creationDate: new Date(),
      lastModifiedDate: new Date(),
    });

  beforeEach(() => {
    mockCategoryRepository = new CategoryRepositoryImpl() as jest.Mocked<CategoryRepositoryImpl>;
    updateCategoryUseCase = new UpdateCategory(mockCategoryRepository);
  });

  it('should update a category and return the updated category', async () => {
    // Setting up the mock to return the updated category
    mockCategoryRepository.updateCategory.mockResolvedValue(updatedCategory);

    const result = await updateCategoryUseCase.execute(userId, title, categoryId, description);

    // Expecting that the mock repository's updateCategory method was called with the correct arguments
    expect(mockCategoryRepository.updateCategory).toHaveBeenCalledWith(userId, title, categoryId, description);
    // Expecting that the result of the use case execution is the updated category
    expect(result).toEqual(updatedCategory);
  });

  it('should handle updating a category without a description', async () => {
    // Setting up the mock to return the updated category (without a description)
    mockCategoryRepository.updateCategory.mockResolvedValue(updatedCategory);

    const result = await updateCategoryUseCase.execute(userId, title, categoryId);

    // Expecting that the mock repository's updateCategory method was called with the correct arguments
    expect(mockCategoryRepository.updateCategory).toHaveBeenCalledWith(userId, title, categoryId, '');
    // Expecting that the result of the use case execution is the updated category
    expect(result).toEqual(updatedCategory);
  });

});
