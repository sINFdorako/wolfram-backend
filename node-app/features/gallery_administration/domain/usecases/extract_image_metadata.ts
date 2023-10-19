import { ImageMetadata } from "../entities/image_metadata";
import { ImageMetadataRepository } from "../repositories/image_metadata_repository";

export class ExtractImageMetadata{
    constructor(private repository: ImageMetadataRepository) {}

    async execute(file: Express.Multer.File): Promise<ImageMetadata> {
        return this.repository.extractMetadata(file);
    }
}
