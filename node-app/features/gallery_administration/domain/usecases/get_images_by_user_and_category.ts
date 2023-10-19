import Image from '../entities/image';
import { ImageRepository } from '../repositories/image_repository';
export class GetImagesByUserAndCategory {
    constructor(private imageRepository: ImageRepository) { }

    async execute(userId: number, categoryId: number): Promise<Image[]> {
        const images = await this.imageRepository.getImagesByUserAndCategory(userId, categoryId);
        return images;
    }
}