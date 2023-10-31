import { ImageRepositoryImpl } from '../../../data/repositories/image_repository_impl';
import { ImageRepository } from '../../repositories/image_repository';
import { GetImagesByUserAndCategory } from '../get_images_by_user_and_category';
import Image, { ImageType } from '../../entities/image';

jest.mock('../../../data/repositories/image_repository_impl.ts');

describe('GetImagesByUserAndCategory', () => {
    let getImagesByUserAndCategoryUseCase: GetImagesByUserAndCategory;
    let mockImageRepository: jest.Mocked<ImageRepository>;

    const userId = 1;
    const categoryId = 1;

    const dummyImages: Image[] = [
        new Image({
            landingpageId: 2,
            categoryId: 1,
            userId: 1,
            url: 'http://dummy.com/image1.jpg',
            filename: 'dummy_image2.jpg',
            originalFilename: 'dummy_original_image2.jpg',
            fileSize: 1345,
            mimeType: 'image/jpeg',
            imageType: ImageType.SPECIFIC_GALLERY_PREVIEW
        }),
        new Image({
            landingpageId: 2,
            categoryId: 1,
            userId: 1,
            url: 'http://dummy.com/image2.jpg',
            filename: 'dummy_image4.jpg',
            originalFilename: 'dummy_original_image5.jpg',
            fileSize: 2345,
            mimeType: 'image/jpeg',
            imageType: ImageType.SPECIFIC_GALLERY_PREVIEW
        })
    ];

    beforeEach(() => {
        const mockImageRepositoryImpl = new ImageRepositoryImpl() as jest.Mocked<ImageRepositoryImpl>;
        mockImageRepository = mockImageRepositoryImpl as unknown as jest.Mocked<ImageRepository>;
        getImagesByUserAndCategoryUseCase = new GetImagesByUserAndCategory(mockImageRepository);
    });

    it('should get images by user and category and return them', async () => {
        // Setting up the mock to return the dummy images
        mockImageRepository.getImagesByUserAndCategory.mockResolvedValue(dummyImages);

        const result = await getImagesByUserAndCategoryUseCase.execute(userId, categoryId);

        // Expecting that the mock repository's getImagesByUserAndCategory method was called with the correct arguments
        expect(mockImageRepository.getImagesByUserAndCategory).toHaveBeenCalledWith(userId, categoryId);
        // Expecting that the result of the use case execution is the dummy images
        expect(result).toEqual(dummyImages);
    });
});
