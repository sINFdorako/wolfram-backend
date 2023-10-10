import { FotodeskSetting } from '../../../domain/entities/fotodesk_setting';
import { FotodeskSettingRepository } from '../../../domain/respositories/fotodesk_setting_repository'; // Adjust the path if needed
import { FotodeskDataSource } from '../../data_sources/postgres/fotodesk_setting_data_source';

export class FotodeskSettingRepositoryImpl implements FotodeskSettingRepository {
    private dataSource: FotodeskDataSource;

    constructor(dataSource: FotodeskDataSource) {
        this.dataSource = dataSource;
    }

    async getSettingById(userId: number): Promise<FotodeskSetting | null> {
        const settingData = await this.dataSource.getSettingByUserIdFromDB(userId);
        if(!settingData) {
            return null;
        }
        return new FotodeskSetting({packages: settingData.packages, appSizeInGB: settingData.appSizeInGB, id: settingData.id, userId: settingData.userId, trialInMonths: settingData.trialInMonths, pricePerMonth: settingData.pricePerMonth});
    }

    async createSetting(setting: FotodeskSetting): Promise<FotodeskSetting> {
        const settingData = await this.dataSource.createSettingOnDB(setting);
        return new FotodeskSetting({packages: settingData.packages, appSizeInGB: settingData.appSizeInGB, id: settingData.id, userId: settingData.userId, trialInMonths: settingData.trialInMonths, pricePerMonth: settingData.pricePerMonth});
    }

    async updateSetting(userId: number, setting: FotodeskSetting): Promise<FotodeskSetting> {
        const settingData = await this.dataSource.updateSettingByUserIdInDB(userId, setting);
        return new FotodeskSetting({packages: settingData.packages, appSizeInGB: settingData.appSizeInGB, id: settingData.id, userId: settingData.userId, trialInMonths: settingData.trialInMonths, pricePerMonth: settingData.pricePerMonth});
    }

    async deleteSetting(userId: number): Promise<void> {
        return await this.dataSource.deleteSettingByUserIdInDB(userId);
    }
}
