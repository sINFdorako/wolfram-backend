import { Router } from "express";
import { LandingpageDataSource } from "../../data/data_sources/landingpage_data_source";
import { LandingpageRepositoryImpl } from "../../data/repositories/landingpage_repository_impl";
import { LandingpageRepository } from "../../domain/repositories/landingpage_repository";
import { CreateLandingpage } from "../../domain/usecases/create_landingpage";
import { DeleteLandingpage } from "../../domain/usecases/delete_landingpage";
import { GetLandingpage } from "../../domain/usecases/get_landingpage";
import { UpdateLandingpage } from "../../domain/usecases/update_landingpage";
import { LandingpageController } from "../controller/landingpage_controller";
import { ensureAuthenticated } from "../../../authentification/presentation/middlewares/auth_middleware";

const dataSource = new LandingpageDataSource();
const landingpageRepository: LandingpageRepository = new LandingpageRepositoryImpl(dataSource);

const createLandingPage: CreateLandingpage = new CreateLandingpage(landingpageRepository);
const updateLandingPage: UpdateLandingpage = new UpdateLandingpage(landingpageRepository);
const getLandingpage: GetLandingpage = new GetLandingpage(landingpageRepository);
const deleteLandingpage: DeleteLandingpage = new DeleteLandingpage(landingpageRepository);

const landingpageController = new LandingpageController(createLandingPage, updateLandingPage, getLandingpage, deleteLandingpage);

const router = Router();

/**
 * create landingpage
 */

router.post('/', ensureAuthenticated, landingpageController.create);

export default router;
