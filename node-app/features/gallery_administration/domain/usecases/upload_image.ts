import Image from '../entities/image';
import { IImageRepository } from '../repositories/iimage_repository';

export class UploadImageUseCase {
    constructor(private imageRepository: IImageRepository) {}

    async execute(imagesData: Image[]): Promise<Image[]> {

        const savedImage = await this.imageRepository.createImages(imagesData);

        return savedImage;
    }
}
