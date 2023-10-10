import { Request, Response } from 'express';
import { CreateSetting } from '../../domain/usecases/create_setting';
import { DeleteSetting } from '../../domain/usecases/delete_setting';
import { GetSettingById } from '../../domain/usecases/get_setting_by_id';
import { UpdateSetting } from '../../domain/usecases/update_setting';
import { FotodeskSetting } from '../../domain/entities/fotodesk_setting';

export class FotoSettingsController {
    constructor(
        private createSetting: CreateSetting,
        private deleteSetting: DeleteSetting,
        private getSettingById: GetSettingById,
        private updateSetting: UpdateSetting
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const { packages, appSizeInGB, trialInMonths, pricePerMonth } = req.body;
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user.id;

            const setting = new FotodeskSetting({ packages: packages, appSizeInGB: appSizeInGB, userId: userId, trialInMonths: trialInMonths, pricePerMonth: pricePerMonth });
            const newSetting = await this.createSetting.execute(setting);

            res.status(201).json(newSetting);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during setting creation' });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user.id;

            const setting = await this.getSettingById.execute(userId);

            if (!setting) {
                return res.status(404).json({ error: 'Setting not found' });
            }

            res.status(200).json(setting);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the setting' });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user?.id;
            const { packages, appSizeInGB, trialInMonths, pricePerMonth } = req.body;

            const setting = new FotodeskSetting({ packages: packages, appSizeInGB: appSizeInGB, userId: userId, trialInMonths: trialInMonths, pricePerMonth: pricePerMonth });
            const updatedSetting = await this.updateSetting.execute(userId, setting);

            res.status(200).json(updatedSetting);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the setting' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user?.id;

            await this.deleteSetting.execute(userId);

            res.status(204).send(); // No Content
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the setting' });
        }
    }
}
