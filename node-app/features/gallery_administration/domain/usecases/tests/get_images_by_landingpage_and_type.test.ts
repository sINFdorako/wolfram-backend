import { ImageRepositoryImpl } from '../../../data/repositories/image_repository_impl';
import Image, { ImageType } from '../../entities/image';
import { ImageRepository } from '../../repositories/image_repository';
import { GetImagesByLandingPageAndType } from '../get_images_by_landingapge_and_type';

jest.mock('../../../data/repositories/image_repository_impl.ts');

describe('GetImagesByLandingPageAndType', () => {
    let getImagesByLandingPageAndTypeUseCase: GetImagesByLandingPageAndType;
    let mockImageRepository: jest.Mocked<ImageRepository>;

    const userId = 1;
    const landingpageId = 1;
    const imageType = ImageType.ME_IMAGE;

    const dummyImages: Image[] = [
        new Image({
            landingpageId: 2,
            categoryId: 1,
            userId: 1,
            url: 'http://dummy.com/image2.jpg',
            filename: 'dummy_image2.jpg',
            originalFilename: 'dummy_original_image2.jpg',
            fileSize: 2345,
            mimeType: 'image/jpeg',
            imageType: ImageType.SPECIFIC_GALLERY_PREVIEW
        }),
        new Image({
            landingpageId: 1,
            categoryId: 2,
            userId: 1,
            url: 'http://dummy.com/image3.jpg',
            filename: 'dummy_image3.jpg',
            originalFilename: 'dummy_original_image3.jpg',
            fileSize: 3456,
            mimeType: 'image/png',
            imageType: ImageType.BACKGROUND_IMAGE
        })
    ];

    beforeEach(() => {
        const mockImageRepositoryImpl = new ImageRepositoryImpl() as jest.Mocked<ImageRepositoryImpl>;
        mockImageRepository = mockImageRepositoryImpl as unknown as jest.Mocked<ImageRepository>;
        getImagesByLandingPageAndTypeUseCase = new GetImagesByLandingPageAndType(mockImageRepository);
    });

    it('should get images by landing page and type and return them', async () => {
        // Setting up the mock to return the dummy images
        mockImageRepository.getImagesByLandingPageAndType.mockResolvedValue(dummyImages);

        const result = await getImagesByLandingPageAndTypeUseCase.execute(userId, landingpageId, imageType);

        // Expecting that the mock repository's getImagesByLandingPageAndType method was called with the correct arguments
        expect(mockImageRepository.getImagesByLandingPageAndType).toHaveBeenCalledWith(userId, landingpageId, imageType);
        // Expecting that the result of the use case execution is the dummy images
        expect(result).toEqual(dummyImages);
    });
});
