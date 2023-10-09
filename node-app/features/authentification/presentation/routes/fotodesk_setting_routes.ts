import express from 'express';
import { FotoSettingsController } from '../controllers/fotodesk_setting_controller';
import { FotodeskSettingRepository } from '../../domain/respositories/fotodesk_setting_repository';
import { FotodeskSettingRepositoryImpl } from '../../data/repositories/postgres/fotodesk_setting_repository_impl';
import { FotodeskDataSource } from '../../data/data_sources/postgres/fotodesk_setting_data_source';
import { CreateSetting } from '../../domain/usecases/create_setting';
import { GetSettingById } from '../../domain/usecases/get_setting_by_id';
import { UpdateSetting } from '../../domain/usecases/update_setting';
import { DeleteSetting } from '../../domain/usecases/delete_setting';
import { ensureAuthenticated, isSuperAdmin } from '../middlewares/auth_middleware';

// Create a FotodeskSettingRepository (using a concrete repository like FotodeskSettingPostgresRepository)
const dataSource = new FotodeskDataSource();
const fotodeskSettingRepo: FotodeskSettingRepository = new FotodeskSettingRepositoryImpl(dataSource);

// Initialize the use cases
const createSetting: CreateSetting = new CreateSetting(fotodeskSettingRepo);
const getSettingById: GetSettingById = new GetSettingById(fotodeskSettingRepo);
const updateSetting: UpdateSetting = new UpdateSetting(fotodeskSettingRepo);
const deleteSetting: DeleteSetting = new DeleteSetting(fotodeskSettingRepo);

const router = express.Router();

const fotoSettingsController = new FotoSettingsController(createSetting, deleteSetting, getSettingById, updateSetting);

// Routes
router.post('/', ensureAuthenticated, fotoSettingsController.create);
router.get('/', ensureAuthenticated, fotoSettingsController.getById);
router.put('/', ensureAuthenticated, fotoSettingsController.update);
router.delete('/', ensureAuthenticated, fotoSettingsController.delete);

export default router;
