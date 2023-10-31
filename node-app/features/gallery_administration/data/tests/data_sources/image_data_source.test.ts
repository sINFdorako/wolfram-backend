import Image, { ImageType } from "../../../domain/entities/image";
import { ImageDataSource } from "../../data_sources/image_data_source";
import { imageEntityToModel } from "../../mappers/image_mapper";
import { ImageModel } from "../../models/image.model";

describe('ImageDataSource', () => {
    const dataSource = new ImageDataSource();

    const dummyImage1: Image = new Image({
        landingpageId: 2,
        categoryId: 3,
        userId: 1,
        url: 'http://example.com/image1.jpg',
        filename: 'example_image1.jpg',
        originalFilename: 'example_original_image1.jpg',
        fileSize: 4567,
        mimeType: 'image/png',
        imageType: ImageType.ME_IMAGE
    });
    
    const dummyImage2: Image = new Image({
        landingpageId: 2,
        categoryId: 4,
        userId: 1,
        url: 'http://example.com/image2.jpg',
        filename: 'example_image2.jpg',
        originalFilename: 'example_original_image2.jpg',
        fileSize: 5678,
        mimeType: 'image/gif',
        imageType: ImageType.SPECIFIC_GALLERY_PREVIEW
    });
    
    const dummyImage3: Image = new Image({
        landingpageId: 2,
        categoryId: 5,
        userId: 1,
        url: 'http://example.com/image3.jpg',
        filename: 'example_image3.jpg',
        originalFilename: 'example_original_image3.jpg',
        fileSize: 6789,
        mimeType: 'image/svg+xml',
        imageType: ImageType.SPECIFIC_GALLERY_PREVIEW
    });
    
    const updateDummy: Image = new Image({
        userId: 3,
        url: 'http://example.com/image_update.jpg',
        filename: 'example_image_update.jpg',
        originalFilename: 'example_original_image_update.jpg',
        fileSize: 7890,
        mimeType: 'image/jpeg',
        imageType: ImageType.BACKGROUND_IMAGE
    });
    
    describe('createImage', () => {
        it('should create an image in the database', async () => {

            const mappedImageToModel = imageEntityToModel(dummyImage1);

            const createdImage = await dataSource.createImage(mappedImageToModel);

            expect(createdImage).toBeTruthy();
            expect(createdImage.url).toEqual(dummyImage1.url);
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

    describe('findImagesByUserId', () => {
        it('should retrieve images based on user ID', async () => {
            const images = await dataSource.findImagesByUserId(1); // Assuming images exist for userId 1
            expect(images).toBeTruthy();
            expect(images.length).toBeGreaterThan(0);
            expect(images[0].userId).toEqual(1);
        });
    });

    describe('bulkCreateImages', () => {
        it('should bulk create images in the database', async () => {
            const dummyImages: ImageModel[] = [
                imageEntityToModel(dummyImage1),
                imageEntityToModel(dummyImage2),
                imageEntityToModel(dummyImage3)
            ];

            const createdImages = await dataSource.bulkCreateImages(dummyImages);
            expect(createdImages).toBeTruthy();
            expect(createdImages.length).toEqual(dummyImages.length);
        });
    });

    describe('updateImage', () => {
        it('should update an image in the database', async () => {
            const dummyImageUpdate: ImageModel = 
                imageEntityToModel(updateDummy);
            
            const updatedImage = await dataSource.updateImage(dummyImageUpdate, 1, 1); // Assuming 1 is an existing image ID
            expect(updatedImage).toBeTruthy();
            expect(updatedImage?.fileSize).toEqual(7890)
        });
    });

    describe('findImageById', () => {
        it('should retrieve an image based on its ID', async () => {
            const image = await dataSource.findImageById(1); 
            expect(image).toBeTruthy();
            expect(image!.id).toEqual(1);
        });
    });

    describe('findByLandingpageIdAndImageType', () => {
        it('should retrieve images based on landing page ID and image type', async () => {
            const images = await dataSource.findByLandingpageIdAndImageType(1, 2, ImageType.SPECIFIC_GALLERY_PREVIEW); // Replace YOUR_TYPE with a valid image type
            expect(images).toBeTruthy();
            expect(images!.length).toBeGreaterThan(0);
            expect(images![0].landingpageId).toEqual(2);
            expect(images![0].imageType).toEqual(ImageType.SPECIFIC_GALLERY_PREVIEW);
        });
    });

    describe('deleteImagesByUserIdAndIds', () => {
        it('should delete images based on user ID and image IDs', async () => {
            await dataSource.deleteImagesByUserIdAndIds(1, [2, 3]); 

            const deletedImage1 = await dataSource.findImageById(2);
            const deletedImage3 = await dataSource.findImageById(3);

            expect(deletedImage1).toBeNull();
            expect(deletedImage3).toBeNull();
        });
    });

});
