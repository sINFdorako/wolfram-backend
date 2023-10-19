import Image from "../entities/image";
import { ImageRepository } from "../repositories/image_repository";

export class CreateSingleImage {
    constructor(private imageRepository: ImageRepository){}

    async execute(image: Image) : Promise<Image> {
        return await this.imageRepository.createImage(image);
    }   
}