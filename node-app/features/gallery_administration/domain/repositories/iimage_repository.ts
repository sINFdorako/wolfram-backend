import Image from "../entities/image";

export interface IImageRepository {
    createImages(image: Image[]): Promise<Image[]>;
    getImagesByUserAndCategory(userId: number, categoryId:number) : Promise<Image[]>;
    getImagesByUser(userId: number): Promise<Image[]>;
    deleteImages(userId: number, imageId: number[]): Promise<void>;
}