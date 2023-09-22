import { Router } from 'express';
import { upload } from '../middleware/image_middleware';
import { exiftool } from 'exiftool-vendored';
import { UploadImageUseCase } from '../../domain/usecases/upload_image';
import { ImageRepository } from '../../data/repositories/image_repository';
import Image from '../../domain/entities/image';
import { ensureAuthenticated } from '../../../authentification/presentation/middlewares/auth_middleware';

const router = Router();

const imageRepository = new ImageRepository();
const uploadImageUseCase = new UploadImageUseCase(imageRepository);

router.post('/uploads', ensureAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).send({ message: 'Please choose a file to upload' });
            return;
        }

        if (!req.user?.id) {
            return res.status(400).send({ message: 'User ID is missing' });
        }

        const image = new Image(
            req.user?.id,
            1,
            `/uploads/${file.filename}`,
            file.filename,
            file.size,
            file.mimetype,
            new Date(),
            new Date()
        );

        // Metadaten extrahieren
        const metadata = await exiftool.read(file.path);

        // Hilfsfunktion, die null oder undefined überprüft
        const isDefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

        // Befüllen von EXIF- und IPTC-Daten, sofern verfügbar
        if (isDefined(metadata.Make)) image.cameraMake = metadata.Make;
        if (isDefined(metadata.Model)) image.cameraModel = metadata.Model;
        if (typeof metadata.ExposureTime === 'string') image.exposureTime = parseFloat(metadata.ExposureTime);
        if (typeof metadata.FNumber === 'string') image.aperture = parseFloat(metadata.FNumber);
        if (typeof metadata.ISO === 'string') image.iso = parseInt(metadata.ISO);
        if (typeof metadata.FocalLength === 'string') image.focalLength = parseFloat(metadata.FocalLength);
        if (isDefined(metadata.Flash)) image.flashUsed = metadata.Flash !== "0";
        if (isDefined(metadata.Creator) && Array.isArray(metadata.Creator)) image.creator = metadata.Creator.join(', '); // Annahme, dass Creator ein Array ist und zu einem String konvertiert werden muss
        if (isDefined(metadata.Copyright)) image.copyright = metadata.Copyright;
        if (isDefined(metadata.CreateDate) && typeof metadata.CreateDate === 'string') image.creationDate = new Date(metadata.CreateDate);
        if (isDefined(metadata.Title)) image.title = metadata.Title;
        if (isDefined(metadata.Description)) image.description = metadata.Description;

        // Es ist möglich, dass die Tags in den Metadaten als Zeichenkette mit einem bestimmten Trennzeichen, z.B. "," oder ";", vorliegen. Hier teilen wir sie in ein Array von Strings.
        if ((await exiftool.read(file.path)).Keywords) {
            image.tags = ((await exiftool.read(file.path)).Keywords as string).split(',').map(tag => tag.trim());
        }

        await uploadImageUseCase.execute(image);

        res.send({ message: 'File was successfully uploaded', filename: file.filename });

    } catch (error) {
        res.status(500).send({ message: 'An error occurred when uploading the file.', error });
    }
});


export default router;
