import { ImageRepositoryImpl } from '../../../data/repositories/image_repository_impl';
import Image, { ImageType } from '../../entities/image';
import { ImageRepository } from '../../repositories/image_repository';
import { CreateSingleImage } from '../create_single_image';

jest.mock('../../../data/repositories/image_repository_impl.ts');

describe('CreateSingleImage', () => {
    let createSingleImageUseCase: CreateSingleImage;
    let mockImageRepository: jest.Mocked<ImageRepository>;

    const dummyImageInput: Image =  new Image({
        landingpageId: 1,
        categoryId: 2,
        userId: 1,
        url: 'http://dummy.com/image3.jpg',
        filename: 'dummy_image3.jpg',
        originalFilename: 'dummy_original_image3.jpg',
        fileSize: 3456,
        mimeType: 'image/png',
        imageType: ImageType.BACKGROUND_IMAGE
    });

    const dummyImageOutput: Image = new Image({
        ...dummyImageInput,
        // Populate this object with the generated ID or any other changes made during the save operation
        id: 1,
    });

    beforeEach(() => {
        const mockImageRepositoryImpl = new ImageRepositoryImpl() as jest.Mocked<ImageRepositoryImpl>;
        mockImageRepository = mockImageRepositoryImpl as unknown as jest.Mocked<ImageRepository>;
        createSingleImageUseCase = new CreateSingleImage(mockImageRepository);
    });

    it('should create an image and return it', async () => {
        // Setting up the mock to return the created image
        mockImageRepository.createImage.mockResolvedValue(dummyImageOutput);

        const result = await createSingleImageUseCase.execute(dummyImageInput);

        // Expecting that the mock repository's createImage method was called with the correct arguments
        expect(mockImageRepository.createImage).toHaveBeenCalledWith(dummyImageInput);
        // Expecting that the result of the use case execution is the created image
        expect(result).toEqual(dummyImageOutput);
    });
});
