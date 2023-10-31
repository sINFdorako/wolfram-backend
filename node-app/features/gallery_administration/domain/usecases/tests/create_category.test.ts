import { CategoryRepositoryImpl } from '../../../data/repositories/category_repository_impl';
import { CreateCategory } from '../create_category';
import Category from '../../entities/category';

jest.mock('../../../data/repositories/category_repository_impl.ts');

describe('CreateCategory Use Case', () => {
  let createCategory: CreateCategory;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (CategoryRepositoryImpl as jest.Mock<CategoryRepositoryImpl>).mockClear();

    const mockCategoryRepository = new CategoryRepositoryImpl();
    createCategory = new CreateCategory(mockCategoryRepository);
  });

  it('should call createCategory with correct parameters and return the result', async () => {
    const userId = 1;
    const name = 'Test Category';
    const description = 'This is a test category';
    const id = 1;
    const creationDate = new Date();
    const lastModifiedDate = new Date();

    const expectedResult = new Category(id, userId, name, creationDate, lastModifiedDate);
    
    // Mocking the repository response
    (CategoryRepositoryImpl.prototype.createCategory as jest.Mock).mockResolvedValueOnce(expectedResult);

    const result = await createCategory.execute(userId, name, description);

    expect(CategoryRepositoryImpl.prototype.createCategory).toHaveBeenCalledWith(userId, name, description);
    expect(result).toEqual(expectedResult);
  });

});
