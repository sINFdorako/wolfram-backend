import { ImageType } from '../../domain/entities/image';
import { ImageModel } from '../models/image.model';
import { Op } from 'sequelize';

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
        return await ImageModel.bulkCreate(imagesModelArray as any[]);
    }

    async createImage(imageModel: ImageModel): Promise<ImageModel> {
        return await ImageModel.create(imageModel as any);
    }

    async updateImage(imageModel: ImageModel, id: number): Promise<ImageModel | null> {
        await ImageModel.update(imageModel, { where: { id } });
        return await ImageModel.findByPk(id);
    }

    async findImageById(id: number): Promise<ImageModel | null> {
        return await ImageModel.findByPk(id);
    }

    async findByLandingpageIdAndImageType(userId: number, landingpageId: number, imageType: ImageType) : Promise<ImageModel[] | null> {
        return await ImageModel.findAll({ where: { userId, landingpageId, imageType }})
    }
}
