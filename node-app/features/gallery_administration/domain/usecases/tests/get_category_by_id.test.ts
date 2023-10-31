import { Category } from "../../../data/models/category.model";
import { CategoryRepositoryImpl } from "../../../data/repositories/category_repository_impl";
import { GetCategoryById } from "../get_category_by_id";

jest.mock("../../../data/repositories/category_repository_impl.ts");

describe('GetCategoryById', () => {
  let getCategoryByIdUseCase: GetCategoryById;
  let mockCategoryRepository: jest.Mocked<CategoryRepositoryImpl>;

  const userId = 1;
  const categoryId = 1;

  const dummyCategory: Category = 
    Category.build({
      id: 1,
      userId,
      name: "Category 1",
      creationDate: new Date(),
      lastModifiedDate: new Date(),
    });


  beforeEach(() => {
    mockCategoryRepository = new CategoryRepositoryImpl() as jest.Mocked<CategoryRepositoryImpl>;
    getCategoryByIdUseCase = new GetCategoryById(mockCategoryRepository);
  });

  it('should get a category by id and return it', async () => {
    // Setting up the mock to return the dummy category
    mockCategoryRepository.getCategoryById.mockResolvedValue(dummyCategory);

    const result = await getCategoryByIdUseCase.execute(userId, categoryId);

    // Expecting that the mock repository's getCategoryById method was called with the correct arguments
    expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId, userId);
    // Expecting that the result of the use case execution is the dummy category
    expect(result).toEqual(dummyCategory);
  });

  it('should return null if the category is not found', async () => {
    // Setting up the mock to return null
    mockCategoryRepository.getCategoryById.mockResolvedValue(null);

    const result = await getCategoryByIdUseCase.execute(userId, categoryId);

    // Expecting that the result of the use case execution is null
    expect(result).toBeNull();
  });
});
