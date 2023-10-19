import { ImageMetadata } from "../entities/image_metadata";

export interface ImageMetadataRepository {
    extractMetadata(file: Express.Multer.File): Promise<ImageMetadata>;
}
