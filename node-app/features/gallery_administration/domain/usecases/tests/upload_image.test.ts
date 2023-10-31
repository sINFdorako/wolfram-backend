import { ImageRepository } from "../../repositories/image_repository";
import { UploadImageUseCase } from "../upload_image";
import Image, { ImageType } from "../../entities/image";
import { ImageRepositoryImpl } from "../../../data/repositories/image_repository_impl";

// Mocking the ImageRepositoryImpl module
jest.mock("../../../data/repositories/image_repository_impl.ts");

describe("UploadImageUseCase", () => {
  let uploadImageUseCase: UploadImageUseCase;
  let mockImageRepository: jest.Mocked<ImageRepository>;

  const dummyImage1: Image = new Image({
    landingpageId: 1,
    categoryId: 1,
    userId: 1,
    url: "http://dummy.com/image1.jpg",
    filename: "dummy_image1.jpg",
    originalFilename: "dummy_original_image1.jpg",
    fileSize: 1234,
    mimeType: "image/jpeg",
    imageType: ImageType.SPECIFIC_GALLERY_PREVIEW,
  });

  const dummyImage2: Image = new Image({
    landingpageId: 2,
    categoryId: 1,
    userId: 1,
    url: "http://dummy.com/image2.jpg",
    filename: "dummy_image2.jpg",
    originalFilename: "dummy_original_image2.jpg",
    fileSize: 2345,
    mimeType: "image/jpeg",
    imageType: ImageType.SPECIFIC_GALLERY_PREVIEW,
  });

  beforeEach(() => {
    // Creating an instance of the mock ImageRepositoryImpl
    const mockImageRepositoryImpl =
      new ImageRepositoryImpl() as jest.Mocked<ImageRepositoryImpl>;
    // Assigning the mock implementation to the interface for type compatibility
    mockImageRepository =
      mockImageRepositoryImpl as unknown as jest.Mocked<ImageRepository>;
    // Creating an instance of UploadImageUseCase with the mocked repository
    uploadImageUseCase = new UploadImageUseCase(mockImageRepository);
  });
  it("should save images and return them", async () => {
    const imagesData: Image[] = [
      // Add some sample image data here
      dummyImage1,
      dummyImage2,
    ];

    const savedImagesData: Image[] = [
      // Add some sample saved image data here (usually, it would include generated IDs, etc.)
      { ...dummyImage1, id: 6 },
      { ...dummyImage2, id: 9 },
    ];

    // Setting up the mock to return the saved images data
    mockImageRepository.createImages.mockResolvedValue(savedImagesData);

    const result = await uploadImageUseCase.execute(imagesData);

    // Expecting that the mock repository's createImages method was called with the correct arguments
    expect(mockImageRepository.createImages).toHaveBeenCalledWith(imagesData);
    // Expecting that the result of the use case execution is the saved images data
    expect(result).toEqual(savedImagesData);
  });
});
