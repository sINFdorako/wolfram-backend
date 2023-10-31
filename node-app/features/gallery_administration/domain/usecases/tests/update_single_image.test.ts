import { ImageRepositoryImpl } from '../../../data/repositories/image_repository_impl';
import { ImageRepository } from '../../repositories/image_repository';
import { UpdateSingleImage } from '../update_single_image';
import Image, { ImageType } from '../../entities/image';

jest.mock('../../../data/repositories/image_repository_impl.ts');

describe('UpdateSingleImage', () => {
  let updateSingleImageUseCase: UpdateSingleImage;
  let mockImageRepository: jest.Mocked<ImageRepository>;
  
  const dummyImage: Image = new Image({
    landingpageId: 1,
    categoryId: 1,
    userId: 1,
    url: 'http://dummy.com/image1.jpg',
    filename: 'dummy_image1.jpg',
    originalFilename: 'dummy_original_image1.jpg',
    fileSize: 1234,
    mimeType: 'image/jpeg',
    imageType: ImageType.ME_IMAGE
});

  const userId = 1;
  const imageId = 1;

  beforeEach(() => {
    const mockImageRepositoryImpl = new ImageRepositoryImpl() as jest.Mocked<ImageRepositoryImpl>;
    mockImageRepository = mockImageRepositoryImpl as unknown as jest.Mocked<ImageRepository>;
    updateSingleImageUseCase = new UpdateSingleImage(mockImageRepository);
  });

  it('should update a single image and return it', async () => {
    const updatedImage = {
      ...dummyImage,
      filename: 'new_filename',
      imageType: ImageType.ME_IMAGE,
    };

    mockImageRepository.updateImage.mockResolvedValue(updatedImage);

    const result = await updateSingleImageUseCase.execute(dummyImage, userId, imageId);

    expect(mockImageRepository.updateImage).toHaveBeenCalledWith(dummyImage, imageId, userId);
    expect(result).toEqual(updatedImage);
  });
});
