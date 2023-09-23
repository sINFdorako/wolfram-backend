import Image from '../../domain/entities/image';
import { IImageRepository } from '../../domain/repositories/iimage_repository';
import { Image as ImageModel } from '../data_sources/postgres/models/image.model';

export class ImageRepository implements IImageRepository {
    async getImagesByUserAndCategory(userId: number, categoryId: number): Promise<Image[]> {
        const images = await ImageModel.findAll({where: {userId, categoryId}});
        return images.map((e) => imageModelToEntity(e));
    }
    async getImagesByUser(userId: number): Promise<Image[]> {
        const images = await ImageModel.findAll({ where: { userId } });
        return images.map((e) => imageModelToEntity(e));
    }
    async createImage(image: Image): Promise<Image> {
        const newImage = await ImageModel.create(imageEntityToModel(image));
        return newImage;
    }
}

function imageModelToEntity(model: any): Image {
    const image = new Image(
        model.userId,
        model.categoryId,
        model.url,
        model.filename,
        model.originalFilename,
        model.fileSize,
        model.mimeType,
        model.uploadDate,
        model.lastModifiedDate
    );

    // Set properties which were not in the constructor
    image.id = model.id;
    image.title = model.title;
    image.description = model.description;
    image.tags = model.tags;

    // EXIF-Daten
    image.cameraMake = model.cameraMake;
    image.cameraModel = model.cameraModel;
    image.exposureTime = model.exposureTime;
    image.aperture = model.aperture;
    image.iso = model.iso;
    image.focalLength = model.focalLength;
    image.flashUsed = model.flashUsed;

    // IPTC-Daten
    image.creator = model.creator;
    image.copyright = model.copyright;
    image.creationDate = model.creationDate;

    return image;
}

function imageEntityToModel(image: Image): any {
    return {
        id: image.id,
        userId: image.userId,
        categoryId: image.categoryId,
        url: image.url,
        filename: image.filename,
        originalFilename: image.originalFilename,
        fileSize: image.fileSize,
        mimeType: image.mimeType,

        // Allgemeine Daten
        title: image.title,
        description: image.description,
        uploadDate: image.uploadDate,
        lastModifiedDate: image.lastModifiedDate,
        tags: image.tags,  // Direkte Zuweisung, da beides string[] ist

        // EXIF-Daten
        cameraMake: image.cameraMake,
        cameraModel: image.cameraModel,
        exposureTime: image.exposureTime,
        aperture: image.aperture,
        iso: image.iso,
        focalLength: image.focalLength,
        flashUsed: image.flashUsed,

        // IPTC-Daten
        creator: image.creator,
        copyright: image.copyright,
        creationDate: image.creationDate
    };
}
