import { ImageMetaDataImpl } from "../../../data/repositories/image_metadata_impl";
import { ImageMetadata } from "../../entities/image_metadata";
import { ExtractImageMetadata } from "../extract_image_metadata";

// Mocking the ImageMetadataRepository module
jest.mock('../../../data/repositories/image_metadata_impl.ts');

describe('ExtractImageMetadata', () => {
    let extractImageMetadataUseCase: ExtractImageMetadata;
    let mockImageMetadataRepository: jest.Mocked<ImageMetaDataImpl>;

    const dummyFile: Express.Multer.File = {
        //... populate this object as needed
        buffer: Buffer.from(''),
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1234,
        fieldname: 'test',
    } as Express.Multer.File;

    beforeEach(() => {
        mockImageMetadataRepository = new ImageMetaDataImpl() as jest.Mocked<ImageMetaDataImpl>;
        extractImageMetadataUseCase = new ExtractImageMetadata(mockImageMetadataRepository);
    });

    it('should extract image metadata and return it', async () => {
        const expectedImageMetadata: ImageMetadata = {
            cameraMake: 'Canon',
            cameraModel: '5D Mark IV',
            exposureTime: 0.008,
            aperture: 2.8,
            iso: 100,
            focalLength: 35,
            flashUsed: false,
            creator: 'John Doe',
            copyright: 'John Doe 2023',
            creationDate: new Date('2023-01-01T00:00:00.000Z'),
            title: 'Sunset',
            description: 'A beautiful sunset.',
            tags: ['sunset', 'nature'],
        };

        mockImageMetadataRepository.extractMetadata.mockResolvedValue(expectedImageMetadata);

        const result = await extractImageMetadataUseCase.execute(dummyFile);

        expect(mockImageMetadataRepository.extractMetadata).toHaveBeenCalledWith(dummyFile);
        expect(result).toEqual(expectedImageMetadata);
    });
});
