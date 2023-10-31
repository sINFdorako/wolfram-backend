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
import { UpdateSingleImage } from '../../domain/usecases/update_single_image';
import { CreateSingleImage } from '../../domain/usecases/create_single_image';
import { GetImagesByLandingPageAndType } from '../../domain/usecases/get_images_by_landingapge_and_type';


const dataSource = new ImageDataSource();
const imageRepository: ImageRepository = new ImageRepositoryImpl();

const metaDataSource = new ImageMetaDataImpl()

const uploadImages: UploadImageUseCase = new UploadImageUseCase(imageRepository);
const getImagesByUser: GetImagesByUser = new GetImagesByUser(imageRepository);
const getImagesByUserAndCateogry: GetImagesByUserAndCategory = new GetImagesByUserAndCategory(imageRepository);
const deleteImages: DeleteImages = new DeleteImages(imageRepository);
const extractImages: ExtractImageMetadata = new ExtractImageMetadata(metaDataSource);
const updateImage: UpdateSingleImage = new UpdateSingleImage(imageRepository);
const createImage: CreateSingleImage = new CreateSingleImage(imageRepository);
const getAllImagesFromLandingPage: GetImagesByLandingPageAndType = new GetImagesByLandingPageAndType(imageRepository);

const imageController = new ImageController(uploadImages, getImagesByUser, getImagesByUserAndCateogry, deleteImages, createImage, extractImages, updateImage, getAllImagesFromLandingPage);

const router = Router();

/**
 * post single image with specific type (enum ImageType) to users's landingpage
 */

router.post('/uploads/landingpage/:landingpageId', ensureAuthenticated, upload.single('image'), imageController.createSingleImage);

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
 * get all uploaded images from user
 */

router.get('/uploads/landingpage/:landingpageId', ensureAuthenticated, imageController.getAllImagesFromLandingPageAndType);

/**
 * delete one ore more images
 */
router.delete('/', ensureAuthenticated, imageController.deleteOneOrMoreImages);


export default router;
