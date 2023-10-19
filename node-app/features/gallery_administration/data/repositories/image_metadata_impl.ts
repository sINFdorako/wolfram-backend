import { exiftool } from "exiftool-vendored";
import { ImageMetadataRepository } from "../../domain/repositories/image_metadata_repository";
import { ImageMetadata } from "../../domain/entities/image_metadata";

export class ImageMetaDataImpl implements ImageMetadataRepository {
    async extractMetadata(file: Express.Multer.File): Promise<ImageMetadata> {
        const metadata = await exiftool.read(file.path);
        const isDefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

        let imageMetadata: ImageMetadata = {};

        if (isDefined(metadata.Make)) imageMetadata.cameraMake = metadata.Make;
        if (isDefined(metadata.Model)) imageMetadata.cameraModel = metadata.Model;
        if (typeof metadata.ExposureTime === 'string') imageMetadata.exposureTime = parseFloat(metadata.ExposureTime);
        if (typeof metadata.FNumber === 'string') imageMetadata.aperture = parseFloat(metadata.FNumber);
        if (typeof metadata.ISO === 'string') imageMetadata.iso = parseInt(metadata.ISO);
        if (typeof metadata.FocalLength === 'string') imageMetadata.focalLength = parseFloat(metadata.FocalLength);
        if (isDefined(metadata.Flash)) imageMetadata.flashUsed = metadata.Flash !== "0";
        if (isDefined(metadata.Creator) && Array.isArray(metadata.Creator)) imageMetadata.creator = metadata.Creator.join(', ');
        if (isDefined(metadata.Copyright)) imageMetadata.copyright = metadata.Copyright;
        if (isDefined(metadata.CreateDate) && typeof metadata.CreateDate === 'string') imageMetadata.creationDate = new Date(metadata.CreateDate);
        if (isDefined(metadata.Title)) imageMetadata.title = metadata.Title;
        if (isDefined(metadata.Description)) imageMetadata.description = metadata.Description;
        if (metadata.Keywords) imageMetadata.tags = (metadata.Keywords as string).split(',').map(tag => tag.trim());

        return imageMetadata;
    }

}

