import { IImageRepository } from "../repositories/iimage_repository";
import Image from '../entities/image';

export class GetImagesByUserAndCategory {
    constructor(private imageRepository: IImageRepository) { }

    async execute(userId: number, categoryId: number): Promise<Image[]> {
        const images = await this.imageRepository.getImagesByUserAndCategory(userId, categoryId);
        return images;
    }
}