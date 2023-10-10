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
                userId: setting.userId,
                trialInMonths: setting.trialInMonths,
                pricePerMonth: setting.pricePerMonth
            }
        }
        return null;
    }

    async createSettingOnDB(domainSetting: DomainFotodeskSetting): Promise<DomainFotodeskSetting> {
        const setting = await FotodeskSetting.create({
            packages: domainSetting.packages,
            appSizeInGB: domainSetting.appSizeInGB,
            userId: domainSetting.userId,
            trialInMonths: domainSetting.trialInMonths,
            pricePerMonth: domainSetting.pricePerMonth,
        });
        return {
            id: setting.id,
            packages: setting.packages,
            appSizeInGB: setting.appSizeInGB,
            userId: setting.userId,
            trialInMonths: setting.trialInMonths,
            pricePerMonth: setting.pricePerMonth
        };
    }

    async updateSettingByUserIdInDB(userId: number, domainSetting: DomainFotodeskSetting): Promise<DomainFotodeskSetting> {
        const settingToUpdate = await FotodeskSetting.findOne({ where: { userId } });
        if (!settingToUpdate) {
            throw new Error('Setting not found or not linked to the user');
        }

        if (domainSetting.packages) {
            settingToUpdate.packages = domainSetting.packages;
        }

        if (domainSetting.appSizeInGB !== undefined) {
            settingToUpdate.appSizeInGB = domainSetting.appSizeInGB;
        }

        if(domainSetting.trialInMonths !== undefined) {
            settingToUpdate.trialInMonths = domainSetting.trialInMonths;
        }

        if(domainSetting.pricePerMonth !== undefined) {
            settingToUpdate.pricePerMonth = domainSetting.pricePerMonth;
        }

        await settingToUpdate.save();

        return {
            id: settingToUpdate.id,
            packages: settingToUpdate.packages,
            appSizeInGB: settingToUpdate.appSizeInGB,
            userId: settingToUpdate.userId,
            trialInMonths: settingToUpdate.trialInMonths,
            pricePerMonth: settingToUpdate.pricePerMonth
        };
    }

    async deleteSettingByUserIdInDB(userId: number): Promise<void> {
        const settingToDelete = await FotodeskSetting.findOne({ where: { userId } });
        if (!settingToDelete) {
            throw new Error('Setting not found or not linked to the user');
        }
        await settingToDelete.destroy();
    }
}

