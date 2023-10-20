import Image from "../entities/image";
import { ImageRepository } from "../repositories/image_repository";

export class UpdateSingleImage {
    constructor(private imageRepository: ImageRepository) {}

    async execute(image: Image, userId: number, imageId: number) : Promise<Image> {
        return await this.imageRepository.updateImage(image, imageId, userId);
    }
}