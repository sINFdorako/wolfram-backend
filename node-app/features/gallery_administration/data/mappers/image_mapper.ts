// imageMapper.ts

import Image from '../../domain/entities/image';
import { ImageModel } from '../models/image.model';

export function imageModelToEntity(model: ImageModel): Image {
    return new Image({
        id: model.id,
        userId: model.userId,
        categoryId: model.categoryId,
        url: model.url,
        filename: model.filename,
        originalFilename: model.originalFilename,
        fileSize: model.fileSize,
        mimeType: model.mimeType,
        uploadDate: model.uploadDate,
        lastModifiedDate: model.lastModifiedDate,
        title: model.title,
        description: model.description,
        tags: model.tags,
        cameraMake: model.cameraMake,
        cameraModel: model.cameraModel,
        exposureTime: model.exposureTime,
        aperture: model.aperture,
        iso: model.iso,
        focalLength: model.focalLength,
        flashUsed: model.flashUsed,
        creator: model.creator,
        copyright: model.copyright,
        creationDate: model.creationDate,
        landingpageId: model.landingpageId,
        imageType: model.imageType
    });
}


export function imageEntityToModel(image: Image): any {
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
        creationDate: image.creationDate,

        landingpageId: image.landingpageId,
        imageType: image.imageType
    };
}

export const transformImageModelToPlainObject = (image: ImageModel) => {
    return {
        id: image.id,
        userId: image.userId,
        categoryId: image.categoryId,
        url: image.url,
        filename: image.filename,
        originalFilename: image.originalFilename,
        fileSize: image.fileSize,
        mimeType: image.mimeType,
        title: image.title,
        description: image.description,
        uploadDate: image.uploadDate,
        lastModifiedDate: image.lastModifiedDate,
        tags: image.tags,

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
        creationDate: image.creationDate,

        // foreign key landingpage
        landingpageId: image.landingpageId,
        imageType: image.imageType
    };
};
