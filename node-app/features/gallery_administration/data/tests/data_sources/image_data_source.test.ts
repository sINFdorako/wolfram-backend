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
});
