import Image from "../entities/image";

export interface IImageRepository {
    createImage(image: Image): Promise<Image>;
}