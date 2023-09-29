import { IImageRepository } from "../repositories/iimage_repository";

export class DeleteImages {
    constructor(private imageRepository: IImageRepository) {};

    async execute(userId: number, imageIds: number[]) : Promise<void> {
        return this.imageRepository.deleteImages(userId, imageIds);
    }
}