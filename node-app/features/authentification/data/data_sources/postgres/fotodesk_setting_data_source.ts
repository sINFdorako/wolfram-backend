import { FotodeskSetting as DomainFotodeskSetting } from '../../../domain/entities/fotodesk_setting';
import { FotodeskSetting } from './models/fotodesk_setting.model';

export class FotodeskDataSource {

    async getSettingByUserIdFromDB(userId: number): Promise<DomainFotodeskSetting | null> {
        const setting = await FotodeskSetting.findOne({ where: { userId } });
        if (setting) {
            return {
                id: setting.id,
                packages: setting.packages,
                appSizeInGB: setting.appSizeInGB,
                userId: setting.userId
            }
        }
        return null;
    }

    async createSettingOnDB(domainSetting: DomainFotodeskSetting): Promise<DomainFotodeskSetting> {
        const setting = await FotodeskSetting.create({
            packages: domainSetting.packages,
            appSizeInGB: domainSetting.appSizeInGB,
            userId: domainSetting.userId
        });
        return {
            id: setting.id,
            packages: setting.packages,
            appSizeInGB: setting.appSizeInGB,
            userId: setting.userId
        };
    }

    async updateSettingByUserIdInDB(userId: number, domainSetting: DomainFotodeskSetting): Promise<DomainFotodeskSetting> {
        const settingToUpdate = await FotodeskSetting.findOne({ where: { userId, id: domainSetting.id } });
        if (!settingToUpdate) {
            throw new Error('Setting not found or not linked to the user');
        }

        if (domainSetting.packages) {
            settingToUpdate.packages = domainSetting.packages;
        }

        if (domainSetting.appSizeInGB !== undefined) {
            settingToUpdate.appSizeInGB = domainSetting.appSizeInGB;
        }

        await settingToUpdate.save();

        return {
            id: settingToUpdate.id,
            packages: settingToUpdate.packages,
            appSizeInGB: settingToUpdate.appSizeInGB,
            userId: settingToUpdate.userId
        };
    }

    async deleteSettingByUserIdInDB(userId: number, id: number): Promise<void> {
        const settingToDelete = await FotodeskSetting.findOne({ where: { userId, id } });
        if (!settingToDelete) {
            throw new Error('Setting not found or not linked to the user');
        }
        await settingToDelete.destroy();
    }
}

