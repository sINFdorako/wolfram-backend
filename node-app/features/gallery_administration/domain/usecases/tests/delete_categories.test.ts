import { CategoryRepositoryImpl } from '../../../data/repositories/category_repository_impl';
import { DeleteCategories } from '../delete_categories';

jest.mock("../../../data/repositories/category_repository_impl");

describe('DeleteCategories', () => {
  let deleteCategoriesUseCase: DeleteCategories;
  let mockCategoryRepository: jest.Mocked<CategoryRepositoryImpl>;

  const userId = 1;
  const categoryIds = [1, 2, 3];

  beforeEach(() => {
    mockCategoryRepository = new CategoryRepositoryImpl() as jest.Mocked<CategoryRepositoryImpl>;
    deleteCategoriesUseCase = new DeleteCategories(mockCategoryRepository);
  });

  it('should delete categories by user id and category ids', async () => {
    // Setting up the mock to mimic successful deletion
    mockCategoryRepository.deleteCategories.mockResolvedValue();

    // Executing the use case
    await deleteCategoriesUseCase.execute(userId, categoryIds);

    // Expecting that the mock repository's deleteCategories method was called with the correct arguments
    expect(mockCategoryRepository.deleteCategories).toHaveBeenCalledWith(userId, categoryIds);
  });

  it('should handle errors gracefully', async () => {
    // Setting up the mock to mimic an error
    mockCategoryRepository.deleteCategories.mockRejectedValue(new Error('An error occurred'));
  
    // Executing the use case and capturing the potential error
    let error: unknown;
    try {
      await deleteCategoriesUseCase.execute(userId, categoryIds);
    } catch (e) {
      error = e;
    }
  
    // Expecting that an error was thrown
    expect(error).toBeInstanceOf(Error);
    if (error instanceof Error) {
      expect(error.message).toBe('An error occurred');
    }
  });
  
});
