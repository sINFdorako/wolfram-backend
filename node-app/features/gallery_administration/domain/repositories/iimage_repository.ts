import Image from "../entities/image";

export interface IImageRepository {
    createImage(image: Image): Promise<Image>;
    getImagesByUserAndCategory(userId: number, categoryId:number) : Promise<Image[]>;
    getImagesByUser(userId: number): Promise<Image[]>;
}