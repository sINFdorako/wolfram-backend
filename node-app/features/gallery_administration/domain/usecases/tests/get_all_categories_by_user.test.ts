import { Category } from "../../../data/models/category.model";
import { CategoryRepositoryImpl } from "../../../data/repositories/category_repository_impl";
import { GetAllCategoriesByUser } from "../get_all_categories_by_user";

jest.mock("../../../data/repositories/category_repository_impl.ts");

describe("GetAllCategoriesByUser", () => {
  let getAllCategoriesByUserUseCase: GetAllCategoriesByUser;
  let mockCategoryRepository: jest.Mocked<CategoryRepositoryImpl>;

  const userId = 1;

  const dummyCategories: Category[] = [
    Category.build({
      id: 1,
      userId,
      name: "Category 1",
      creationDate: new Date(),
      lastModifiedDate: new Date(),
    }),
    Category.build({
      id: 2,
      userId,
      name: "Category 2",
      creationDate: new Date(),
      lastModifiedDate: new Date(),
    }),
  ];

  beforeEach(() => {
    mockCategoryRepository =
      new CategoryRepositoryImpl() as jest.Mocked<CategoryRepositoryImpl>;
    getAllCategoriesByUserUseCase = new GetAllCategoriesByUser(
      mockCategoryRepository
    );
  });

  it("should get all categories by a user and return them", async () => {
    // Setting up the mock to return the dummy categories
    mockCategoryRepository.getAllCategoriesByUser.mockResolvedValue(
      dummyCategories
    );

    const result = await getAllCategoriesByUserUseCase.execute(userId);

    // Expecting that the mock repository's getAllCategoriesByUser method was called with the correct argument
    expect(mockCategoryRepository.getAllCategoriesByUser).toHaveBeenCalledWith(
      userId
    );
    // Expecting that the result of the use case execution is the dummy categories
    expect(result).toEqual(dummyCategories);
  });

  it("should return null if no categories are found", async () => {
    // Setting up the mock to return null
    mockCategoryRepository.getAllCategoriesByUser.mockResolvedValue(null);

    const result = await getAllCategoriesByUserUseCase.execute(userId);

    // Expecting that the result of the use case execution is null
    expect(result).toBeNull();
  });
});
