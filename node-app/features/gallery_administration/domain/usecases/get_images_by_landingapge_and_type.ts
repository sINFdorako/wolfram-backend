import Image, { ImageType } from "../entities/image";
import { ImageRepository } from "../repositories/image_repository";

export class getImagesByLandingPageAndType {
    constructor(private imageRepository: ImageRepository) {}

    async execute(userId: number, landingpageId: number, imageType: ImageType) : Promise<Image[]> {
        return await this.imageRepository.getImagesByLandingPageAndType(userId, landingpageId, imageType);
    }

}