import Image from '../entities/image';
import { IImageRepository } from '../repositories/iimage_repository';

export class UploadImageUseCase {
    constructor(private imageRepository: IImageRepository) {}

    async execute(imageData: Image): Promise<Image> {

        const savedImage = await this.imageRepository.createImage(imageData);

        return savedImage;
    }
}
