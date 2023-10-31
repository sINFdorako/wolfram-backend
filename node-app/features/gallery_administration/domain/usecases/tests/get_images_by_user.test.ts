import { ImageRepositoryImpl } from "../../../data/repositories/image_repository_impl";
import { ImageRepository } from "../../repositories/image_repository";
import { GetImagesByUser } from "../get_images_by_user";
import Image, { ImageType } from "../../entities/image";

// Mock the ImageRepositoryImpl module
jest.mock("../../../data/repositories/image_repository_impl.ts");

describe("GetImagesByUser", () => {
  let getImagesByUserUseCase: GetImagesByUser;
  let mockImageRepository: jest.Mocked<ImageRepository>;

  const userId = 1;

  const dummyImages: Image[] = [
    new Image({
      landingpageId: 2,
      categoryId: 1,
      userId: 1,
      url: "http://dummy.com/image2.jpg",
      filename: "dummy_image2.jpg",
      originalFilename: "dummy_original_image2.jpg",
      fileSize: 2345,
      mimeType: "image/jpeg",
      imageType: ImageType.SPECIFIC_GALLERY_PREVIEW,
    }),
    new Image({
      landingpageId: 1,
      categoryId: 1,
      userId: 1,
      url: "http://dummy.com/image1.jpg",
      filename: "dummy_image1.jpg",
      originalFilename: "dummy_original_image1.jpg",
      fileSize: 1234,
      mimeType: "image/jpeg",
      imageType: ImageType.ME_IMAGE,
    }),
  ];

  beforeEach(() => {
    // Creating an instance of the mock ImageRepositoryImpl
    const mockImageRepositoryImpl =
      new ImageRepositoryImpl() as jest.Mocked<ImageRepositoryImpl>;
    // Assigning the mock implementation to the interface for type compatibility
    mockImageRepository =
      mockImageRepositoryImpl as unknown as jest.Mocked<ImageRepository>;
    // Creating an instance of GetImagesByUser with the mocked repository
    getImagesByUserUseCase = new GetImagesByUser(mockImageRepository);
  });

  it("should get images by user and return them", async () => {
    // Setting up the mock to return the dummy images
    mockImageRepository.getImagesByUser.mockResolvedValue(dummyImages);

    const result = await getImagesByUserUseCase.execute(userId);

    // Expecting that the mock repository's getImagesByUser method was called with the correct arguments
    expect(mockImageRepository.getImagesByUser).toHaveBeenCalledWith(userId);
    // Expecting that the result of the use case execution is the dummy images
    expect(result).toEqual(dummyImages);
  });
});
