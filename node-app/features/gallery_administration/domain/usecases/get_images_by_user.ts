import { ImageRepository } from "../repositories/image_repository";
import Image from '../entities/image';

export class GetImagesByUser {
    constructor(private imageRepository: ImageRepository) { }

    async execute(userId: number): Promise<Image[]> {
        const images = await this.imageRepository.getImagesByUser(userId);

        return images;
    }
}