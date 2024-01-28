import { Router } from "express";
import { WasabiRepositoryImpl } from "../../data/repositories/wasabi_repository_impl";
import { WasabiRepository } from "../../domain/repositories/wasabi_repository";
import { GeneratePresignedUrl } from "../../domain/usecases/generate_presigned_url";
import { WasabiController } from "../controller/wasabi_controller";
import { ensureAuthenticated } from "../../../authentification/presentation/middlewares/auth_middleware";

const repository: WasabiRepository = new WasabiRepositoryImpl();
const signedUrl: GeneratePresignedUrl = new GeneratePresignedUrl(repository);

const wasabiController = new WasabiController(signedUrl);

const router = Router();

router.get('/', ensureAuthenticated, wasabiController.signedUrl)

export default router;