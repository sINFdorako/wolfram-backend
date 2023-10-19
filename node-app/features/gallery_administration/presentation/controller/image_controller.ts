import { Request, Response } from "express";
import { exiftool } from "exiftool-vendored";
import Image from "../../domain/entities/image";
import { UploadImageUseCase } from "../../domain/usecases/upload_image";
import { GetImagesByUser } from "../../domain/usecases/get_images_by_user";
import { GetImagesByUserAndCategory } from "../../domain/usecases/get_images_by_user_and_category";
import { DeleteImages } from "../../domain/usecases/delete_images";
import { ImageModel } from "../../data/models/image.model";
import fs from 'fs';
import { Op } from 'sequelize';
import { ExtractImageMetadata } from "../../domain/usecases/extract_image_metadata";
import { ImageMetadataRepository } from "../../domain/repositories/image_metadata_repository";

export class ImageController {
    constructor(
        private uploadImage: UploadImageUseCase,
        private getImagesByUser: GetImagesByUser,
        private getImagesByUserAndCategory: GetImagesByUserAndCategory,
        private deleteImages: DeleteImages,
        private extractMetadata: ExtractImageMetadata
    ) { }

    createSingleImage = async (req: Request, res: Response) => {
        // Extract logic for uploading a single image
    }

    updateSingleImage = async (req: Request, res: Response) => {
        // Extract logic for updating a single image
    }

    createMultipleImages = async (req: Request, res: Response) => {
        try {
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                return res.status(400).send({ message: 'Please select files to upload.' });
            }

            if (!req.user?.id) {
                return res.status(400).send({ message: 'Userid is missing' });
            }

            const categoryId = Number(req.params.categoryId);
            if (isNaN(categoryId)) {
                return res.status(400).send({ message: 'Category id is not a valid type, expected number.' });
            }

            let imagesToUpload = [];
            let fileNamesProcessed = [];


            for (const file of files) {
                console.log(file);

                console.log(file.originalname);

                const image = new Image({
                    userId: req.user?.id,
                    categoryId: categoryId,
                    url: `/uploads/${file.filename}`,
                    filename: file.filename,
                    originalFilename: file.originalname,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                    uploadDate: new Date(),
                    lastModifiedDate: new Date()
                });

               const metadata = await this.extractMetadata.execute(file);

                // Populate the image entity with the metadata
                Object.assign(image, metadata);

                imagesToUpload.push(image);
                fileNamesProcessed.push(file.originalname);
            }

            await this.uploadImage.execute(imagesToUpload);
            res.send({ message: 'Images were uploaded successfully', filenames: fileNamesProcessed });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'When uploading images, an error occurred.', error });
        }
    }

    getImagesByCategory = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }

            const userId = req.user.id;
            const categoryId = Number(req.params.categoryId);

            const images = await this.getImagesByUserAndCategory.execute(userId, categoryId);

            if (!images || images.length === 0) {
                return res.status(404).send({ message: 'No images found for this user and category' });
            }

            res.send(images);
        } catch (error) {
            res.status(500).send({ message: 'An error occurred when fetching the images.', error });
        }
    }

    getAllImages = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user.id;
    
            const images = await this.getImagesByUser.execute(userId);
    
            if (!images || images.length === 0) {
                return res.status(404).send({ message: 'No images found for this user' });
            }
    
            res.send(images);
        } catch (error) {
            res.status(500).send({ message: 'An error occurred when fetching the images.', error });
        }
    }

    deleteOneOrMoreImages = async (req: Request, res: Response) => {
        try {
            const imageIds = req.body.imageIds;
    
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
    
            const userId = req.user.id;
    
            if (!Array.isArray(imageIds) || !imageIds.length) {
                res.status(400).send({ message: 'No image IDs provided.' });
                return;
            }
    
            // First, get the paths of the image files from the database.
            const imagesToDelete = await ImageModel.findAll({
                where: {
                    id: {
                        [Op.in]: imageIds
                    }
                }
            });
    
            const pathsToDelete = imagesToDelete.map(image => image.url);
    
            // Next, delete the records from the database
            await this.deleteImages.execute(userId, imageIds);
    
            // After the database operation, delete the actual image files.
            for (const relativePath of pathsToDelete) {
                const fullPath = `/home${relativePath}`;
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Failed to delete file ${fullPath}: ${err}`);
                    }
                });
            }
    
            res.send({ message: 'Images deleted successfully' });
    
        } catch (error) {
            res.status(500).send({ message: 'Failed to delete images', error: error });
        }
    }
}
