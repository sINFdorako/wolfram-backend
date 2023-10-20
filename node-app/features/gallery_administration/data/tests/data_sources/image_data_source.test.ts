import Image from "../../../domain/entities/image";
import { ImageDataSource } from "../../data_sources/image_data_source";
import { imageEntityToModel } from "../../mappers/image_mapper";
import { ImageModel } from "../../models/image.model";

describe('ImageDataSource', () => {
    const dataSource = new ImageDataSource();

    beforeAll(async () => {
        // Additional setup if required.
    });

    beforeEach(async () => {
        // Clean up database or set up initial state
    });

    afterAll(async () => {
        // Additional cleanup after all tests, like closing DB connections.
        await ImageModel.destroy({ where: { id: 123 } });
    });

    describe('createImage', () => {
        it('should create an image in the database', async () => {
            const dummyImage: Image = new Image({
                categoryId: 1,
                userId: 1,
                id: 123,
                url: 'http://dummy.com/image.jpg',
                filename: 'dummy_image.jpg',
                originalFilename: 'dummy_original_image.jpg',
                fileSize: 1234,
                mimeType: 'image/jpeg',
            });

            const mappedImageToModel = imageEntityToModel(dummyImage);

            const createdImage = await dataSource.createImage(mappedImageToModel);

            expect(createdImage).toBeTruthy();
            expect(createdImage.url).toEqual(dummyImage.url);
        });
    });

    describe('findImagesByUserIdAndCategory', () => {
        it('should retrieve images based on user ID and category', async () => {
            const images = await dataSource.findImagesByUserIdAndCategory(1, 1); // Assuming category 2 exists for userId 1
            expect(images).toBeTruthy();
            expect(images.length).toBeGreaterThan(0);
            expect(images[0].userId).toEqual(1);
            expect(images[0].categoryId).toEqual(1);
        });
    });
});
