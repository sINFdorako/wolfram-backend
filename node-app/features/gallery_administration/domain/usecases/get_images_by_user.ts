import { IImageRepository } from "../repositories/iimage_repository";
import Image from '../entities/image';

export class GetImagesByUser {
    constructor(private imageRepository: IImageRepository) { }

    async execute(userId: number): Promise<Image[]> {
        const images = await this.imageRepository.getImagesByUser(userId);

        return images;
    }
}