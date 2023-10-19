import Image from '../entities/image';
import { ImageRepository } from '../repositories/image_repository';

export class UploadImageUseCase {
    constructor(private imageRepository: ImageRepository) {}

    async execute(imagesData: Image[]): Promise<Image[]> {

        const savedImage = await this.imageRepository.createImages(imagesData);

        return savedImage;
    }
}
