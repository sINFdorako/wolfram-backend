import { Router } from 'express';
import { multerErrorHandler, upload } from '../middleware/image_middleware';
import { ensureAuthenticated } from '../../../authentification/presentation/middlewares/auth_middleware';
import { GetImagesByUser } from '../../domain/usecases/get_images_by_user';
import { GetImagesByUserAndCategory } from '../../domain/usecases/get_images_by_user_and_category';
import { DeleteImages } from '../../domain/usecases/delete_images';
import { ImageDataSource } from '../../data/data_sources/image_data_source';
import { ImageRepository } from '../../domain/repositories/image_repository';
import { ImageRepositoryImpl } from '../../data/repositories/image_repository_impl';
import { UploadImageUseCase } from '../../domain/usecases/upload_image';
import { ImageMetaDataImpl } from '../../data/repositories/image_metadata_impl';
import { ExtractImageMetadata } from '../../domain/usecases/extract_image_metadata';
import { ImageController } from '../controller/image_controller';


const dataSource = new ImageDataSource();
const imageRepository: ImageRepository = new ImageRepositoryImpl(dataSource);

const metaDataSource = new ImageMetaDataImpl()

const uploadImage: UploadImageUseCase = new UploadImageUseCase(imageRepository);
const getImagesByUser: GetImagesByUser = new GetImagesByUser(imageRepository);
const getImagesByUserAndCateogry: GetImagesByUserAndCategory = new GetImagesByUserAndCategory(imageRepository);
const deleteImages: DeleteImages = new DeleteImages(imageRepository);
const extractImages: ExtractImageMetadata = new ExtractImageMetadata(metaDataSource);

const imageController = new ImageController(uploadImage, getImagesByUser, getImagesByUserAndCateogry, deleteImages, extractImages)

const router = Router();

/**
 * post single image with specific type (enum ImageType) to users's landingpage
 */

router.post('/uploads/landingpage/:landingpageId', ensureAuthenticated, upload.single('image'));

/**
 * post one ore more images to respective category from user
 */

router.post('/uploads/:categoryId', ensureAuthenticated, upload.array('images[]'), imageController.createMultipleImages);

/**
 * catch errors from multer middleware for image uploading
 */

router.use(multerErrorHandler);

/**
 * get all images from single category of user
 */

router.get('/uploads/:categoryId', ensureAuthenticated, imageController.getImagesByCategory);

/**
 * get all uploaded images from user
 */

router.get('/uploads', ensureAuthenticated, imageController.getAllImages);

/**
 * delete one ore more images
 */
router.delete('/', ensureAuthenticated, imageController.deleteOneOrMoreImages);


export default router;
