import Image, { ImageType } from '../../domain/entities/image';
import { ImageRepository } from '../../domain/repositories/image_repository';
import { imageEntityToModel, imageModelToEntity } from '../mappers/image_mapper';
import { ImageDataSource } from '../data_sources/image_data_source';

export class ImageRepositoryImpl implements ImageRepository {
    private dataSource: ImageDataSource;

    constructor(dataSource: ImageDataSource) {
        this.dataSource = dataSource;
    }

    async getImagesByLandingPageAndType(userId: number, landingpageId: number, imageType: ImageType): Promise<Image[]> {
        const images = await this.dataSource.findByLandingpageIdAndImageType(userId, landingpageId, imageType);
        return images ? images.map(imageModelToEntity) : [];
    }
    
    async deleteImages(userId: number, imageIds: number[]): Promise<void> {
        await this.dataSource.deleteImagesByUserIdAndIds(userId, imageIds);
    }

    async getImagesByUserAndCategory(userId: number, categoryId: number): Promise<Image[]> {
        const images = await this.dataSource.findImagesByUserIdAndCategory(userId, categoryId);
        return images.map(imageModelToEntity);
    }

    async getImagesByUser(userId: number): Promise<Image[]> {
        const images = await this.dataSource.findImagesByUserId(userId);
        return images.map(imageModelToEntity);
    }

    async createImages(images: Image[]): Promise<Image[]> {
        const imagesModelArray = images.map(imageEntityToModel);
        const newImages = await this.dataSource.bulkCreateImages(imagesModelArray);
        return newImages.map(imageModelToEntity);
    }

    async createImage(image: Image): Promise<Image> {
        const newImage = await this.dataSource.createImage(imageEntityToModel(image));
        return imageModelToEntity(newImage);
    }

    async updateImage(image: Image): Promise<Image> {
        await this.dataSource.updateImage(imageEntityToModel(image), image.id!);
        const updatedImage = await this.dataSource.findImageById(image.id!);
        return imageModelToEntity(updatedImage!);
    }
}
