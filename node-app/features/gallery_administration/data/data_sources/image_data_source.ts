import { ImageType } from '../../domain/entities/image';
import { transformImageModelToPlainObject } from '../mappers/image_mapper';
import { ImageModel } from '../models/image.model';
import { Op } from 'sequelize';

export class ImageDataSource {
    async deleteImagesByUserIdAndIds(userId: number, imageIds: number[]): Promise<void> {
        try {
            await ImageModel.destroy({
                where: {
                    userId: userId,
                    id: {
                        [Op.in]: imageIds
                    }
                }
            });
        } catch (error) {
            console.error("Error deleting images by user ID and image IDs:", error);
            throw error;
        }
    }

    async findImagesByUserIdAndCategory(userId: number, categoryId: number): Promise<ImageModel[]> {
        try {
            return await ImageModel.findAll({ where: { userId, categoryId } });
        } catch (error) {
            console.error("Error finding images by user ID and category:", error);
            throw error;
        }
    }

    async findImagesByUserId(userId: number): Promise<ImageModel[]> {
        try {
            return await ImageModel.findAll({ where: { userId } });
        } catch (error) {
            console.error("Error finding images by user ID:", error);
            throw error;
        }
    }

    async bulkCreateImages(imagesModelArray: ImageModel[]): Promise<ImageModel[]> {
        try {
            const plainImages = imagesModelArray.map(transformImageModelToPlainObject);
            return await ImageModel.bulkCreate(plainImages);
        } catch (error) {
            console.error("Error bulk creating images:", error);
            throw error;
        }
    }
    
    async createImage(imageModel: ImageModel): Promise<ImageModel> {
        try {
            const plainImage = transformImageModelToPlainObject(imageModel);
            return await ImageModel.create(plainImage);
        } catch (error) {
            console.error("Error creating image:", error);
            throw error;
        }
    }

    async updateImage(imageModel: ImageModel, id: number, userId: number): Promise<ImageModel | null> {
        try {
            await ImageModel.update(imageModel, { where: { userId, id } });
            return await ImageModel.findByPk(id);
        } catch (error) {
            console.error("Error updating image:", error);
            throw error;
        }
    }

    async findImageById(id: number): Promise<ImageModel | null> {
        try {
            return await ImageModel.findByPk(id);
        } catch (error) {
            console.error("Error finding image by ID:", error);
            throw error;
        }
    }

    async findByLandingpageIdAndImageType(userId: number, landingpageId: number, imageType: ImageType): Promise<ImageModel[] | null> {
        try {
            return await ImageModel.findAll({ where: { userId, landingpageId, imageType }})
        } catch (error) {
            console.error("Error finding images by landing page ID and image type:", error);
            throw error;
        }
    }
}
