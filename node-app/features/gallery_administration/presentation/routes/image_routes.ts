import { Router } from 'express';
import { upload } from '../middleware/image_middleware';
import { exiftool } from 'exiftool-vendored';
import { UploadImageUseCase } from '../../domain/usecases/upload_image';
import { ImageRepository } from '../../data/repositories/image_repository';
import Image from '../../domain/entities/image';
import { ensureAuthenticated } from '../../../authentification/presentation/middlewares/auth_middleware';
import { GetImagesByUser } from '../../domain/usecases/get_images_by_user';
import { GetImagesByUserAndCategory } from '../../domain/usecases/get_images_by_user_and_category';
import { DeleteImages } from '../../domain/usecases/delete_images';
import { Image as ImageModel } from '../../data/data_sources/postgres/models/image.model';
import { Op } from 'sequelize';
import fs from 'fs';
import multer from 'multer';

const router = Router();

const imageRepository = new ImageRepository();
const uploadImageUseCase = new UploadImageUseCase(imageRepository);
const getImagesByUser = new GetImagesByUser(imageRepository);
const getImagesByUserAndCategory = new GetImagesByUserAndCategory(imageRepository);
const deleteImageIds = new DeleteImages(imageRepository);

const serverRoot = 'https://backend.fotogalerie-wolfram-wildner.de'; 

const multerErrorHandler = (err: any, req: any, res: any, next: any) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).send({ message: 'Die Dateigröße überschreitet das Limit.' });
    }
    next(err);
};

router.post('/uploads/:categoryId', ensureAuthenticated, upload.array('images[]'), async (req, res) => {
    try {
        const files = req.files as Express.Multer.File[];
        
        if (!files || files.length === 0) {
            res.status(400).send({ message: 'Bitte wählen Sie Dateien zum Hochladen aus.' });
            return;
        }

        if (!req.user?.id) {
            return res.status(400).send({ message: 'Benutzer-ID fehlt.' });
        }

        const categoryId = Number(req.params.categoryId);
        if (isNaN(categoryId)) {
            return res.status(400).send({ message: 'Ungültige Kategorie-ID' });
        }

        let imagesToUpload = [];
        let fileNamesProcessed = [];

        for (const file of files) {
            console.log(file.originalname);

            const image = new Image(
                req.user?.id,
                categoryId,
                `/uploads/${file.filename}`,
                file.filename,
                file.originalname,
                file.size,
                file.mimetype,
                new Date(),
                new Date()
            );

            // Extract metadata
            const metadata = await exiftool.read(file.path);
            const isDefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

            if (isDefined(metadata.Make)) image.cameraMake = metadata.Make;
            if (isDefined(metadata.Model)) image.cameraModel = metadata.Model;
            if (typeof metadata.ExposureTime === 'string') image.exposureTime = parseFloat(metadata.ExposureTime);
            if (typeof metadata.FNumber === 'string') image.aperture = parseFloat(metadata.FNumber);
            if (typeof metadata.ISO === 'string') image.iso = parseInt(metadata.ISO);
            if (typeof metadata.FocalLength === 'string') image.focalLength = parseFloat(metadata.FocalLength);
            if (isDefined(metadata.Flash)) image.flashUsed = metadata.Flash !== "0";
            if (isDefined(metadata.Creator) && Array.isArray(metadata.Creator)) image.creator = metadata.Creator.join(', ');
            if (isDefined(metadata.Copyright)) image.copyright = metadata.Copyright;
            if (isDefined(metadata.CreateDate) && typeof metadata.CreateDate === 'string') image.creationDate = new Date(metadata.CreateDate);
            if (isDefined(metadata.Title)) image.title = metadata.Title;
            if (isDefined(metadata.Description)) image.description = metadata.Description;

            if (metadata.Keywords) {
                image.tags = (metadata.Keywords as string).split(',').map(tag => tag.trim());
            }

            imagesToUpload.push(image);
            fileNamesProcessed.push(file.originalname);
        }

        await uploadImageUseCase.execute(imagesToUpload);
        res.send({ message: 'Dateien wurden erfolgreich hochgeladen', filenames: fileNamesProcessed });

    } catch (error) {
        res.status(500).send({ message: 'Beim Hochladen der Dateien ist ein Fehler aufgetreten.', error });
    }
});

router.use(multerErrorHandler);

router.get('/uploads/:categoryId', ensureAuthenticated, async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(400).send({ message: 'User ID is missing' });
        }

        const userId = req.user.id;
        const categoryId = Number(req.params.categoryId);

        const images = await getImagesByUserAndCategory.execute(userId, categoryId);

        if (!images || images.length === 0) {
            return res.status(404).send({ message: 'No images found for this user and category' });
        }

        res.send(images);
    } catch (error) {
        res.status(500).send({ message: 'An error occurred when fetching the images.', error });
    }
});

router.get('/uploads', ensureAuthenticated, async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(400).send({ message: 'User ID is missing' });
        }
        const userId = req.user.id; 

        const images = await getImagesByUser.execute(userId);

        if (!images || images.length === 0) {
            return res.status(404).send({ message: 'No images found for this user' });
        }

        res.send(images);
    } catch (error) {
        res.status(500).send({ message: 'An error occurred when fetching the images.', error });
    }
});


router.delete('/', ensureAuthenticated, async (req, res) => {
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
        await deleteImageIds.execute(userId, imageIds);

        // After the database operation, delete the actual image files.
        for(const relativePath of pathsToDelete) {
            const fullPath = `${serverRoot}${relativePath}`;
            fs.unlink(fullPath, (err) => {
                if(err) {
                    console.error(`Failed to delete file ${fullPath}: ${err}`);
                }
            });
        }

        res.send({ message: 'Images deleted successfully' });

    } catch (error) {
        res.status(500).send({ message: 'Failed to delete images', error: error });
    }
});

export default router;
