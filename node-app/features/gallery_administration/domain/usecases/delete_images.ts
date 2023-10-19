import { ImageRepository } from "../repositories/image_repository";

export class DeleteImages {
    constructor(private imageRepository: ImageRepository) {};

    async execute(userId: number, imageIds: number[]) : Promise<void> {
        return this.imageRepository.deleteImages(userId, imageIds);
    }
}