import { ImageRepositoryImpl } from '../../../data/repositories/image_repository_impl';
import { ImageRepository } from '../../repositories/image_repository';
import { DeleteImages } from '../delete_images';

jest.mock('../../../data/repositories/image_repository_impl.ts');

describe('DeleteImages', () => {
    let deleteImagesUseCase: DeleteImages;
    let mockImageRepository: jest.Mocked<ImageRepository>;

    const userId = 1;
    const imageIds = [1, 2, 3];

    beforeEach(() => {
        const mockImageRepositoryImpl = new ImageRepositoryImpl() as jest.Mocked<ImageRepositoryImpl>;
        mockImageRepository = mockImageRepositoryImpl as unknown as jest.Mocked<ImageRepository>;
        deleteImagesUseCase = new DeleteImages(mockImageRepository);
    });

    it('should delete images by user and return nothing', async () => {
        // Setting up the mock to simulate a successful deletion
        mockImageRepository.deleteImages.mockResolvedValue();

        await deleteImagesUseCase.execute(userId, imageIds);

        // Expecting that the mock repository's deleteImages method was called with the correct arguments
        expect(mockImageRepository.deleteImages).toHaveBeenCalledWith(userId, imageIds);
    });
});
