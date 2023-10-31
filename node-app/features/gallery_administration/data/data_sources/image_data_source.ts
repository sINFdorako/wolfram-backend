import { ImageType } from '../../domain/entities/image';
import { transformImageModelToPlainObject } from '../mappers/image_mapper';
import { ImageModel } from '../models/image.model';
import { Op, Optional } from 'sequelize';

export class ImageDataSource {
    async deleteImagesByUserIdAndIds(userId: number, imageIds: number[]): Promise<void> {
         await ImageModel.destroy({
            where: {
                userId: userId,
                id: {
                    [Op.in]: imageIds
                }
            }
        });
    }

    async findImagesByUserIdAndCategory(userId: number, categoryId: number): Promise<ImageModel[]> {
        return await ImageModel.findAll({ where: { userId, categoryId } });
    }

    async findImagesByUserId(userId: number): Promise<ImageModel[]> {
        return await ImageModel.findAll({ where: { userId } });
    }

    async bulkCreateImages(imagesModelArray: ImageModel[]): Promise<ImageModel[]> {
        const plainImages = imagesModelArray.map(transformImageModelToPlainObject);
        return await ImageModel.bulkCreate(plainImages);
    }
    
    async createImage(imageModel: ImageModel): Promise<ImageModel> {
        const plainImage = transformImageModelToPlainObject(imageModel);
        return await ImageModel.create(plainImage);
    }
    

    async updateImage(imageModel: ImageModel, id: number, userId: number): Promise<ImageModel | null> {
        await ImageModel.update(imageModel, { where: { userId, id } });
        return await ImageModel.findByPk(id);
    }

    async findImageById(id: number): Promise<ImageModel | null> {
        return await ImageModel.findByPk(id);
    }

    async findByLandingpageIdAndImageType(userId: number, landingpageId: number, imageType: ImageType) : Promise<ImageModel[] | null> {
        return await ImageModel.findAll({ where: { userId, landingpageId, imageType }})
    }
}
