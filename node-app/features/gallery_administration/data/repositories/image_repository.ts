import Image from '../../domain/entities/image';
import { IImageRepository } from '../../domain/repositories/iimage_repository';
import { Image as ImageModel } from '../data_sources/postgres/models/image.model';

export class ImageRepository implements IImageRepository {
    async createImage(image: Image): Promise<Image> {
        const newImage = await ImageModel.create(imageEntityToModel(image));
       return newImage;
    }
}

function imageEntityToModel(image: Image): any {
    return {
        id: image.id,
        userId: image.userId,
        categoryId: image.categoryId,
        url: image.url,
        filename: image.filename,
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
