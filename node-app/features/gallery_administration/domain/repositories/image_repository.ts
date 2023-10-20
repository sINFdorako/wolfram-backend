import Image, { ImageType } from "../entities/image";

export interface ImageRepository {
    createImages(image: Image[]): Promise<Image[]>;
    createImage(image: Image): Promise<Image>;
    updateImage(image: Image, userId: number, imageId: number): Promise<Image>;
    getImagesByUserAndCategory(userId: number, categoryId:number) : Promise<Image[]>;
    getImagesByUser(userId: number): Promise<Image[]>;
    getImagesByLandingPageAndType(userId: number, landingpageId: number, imageType: ImageType) : Promise<Image[]>;
    deleteImages(userId: number, imageId: number[]): Promise<void>;
}