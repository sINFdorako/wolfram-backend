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
        return new FotodeskSetting(settingData.packages, settingData.appSizeInGB, settingData.id, settingData.userId);
    }

    async createSetting(setting: FotodeskSetting): Promise<FotodeskSetting> {
        const newSetting = await this.dataSource.createSettingOnDB(setting);
        return new FotodeskSetting(newSetting.packages, newSetting.appSizeInGB, newSetting.id, newSetting.userId);
    }

    async updateSetting(userId: number, setting: FotodeskSetting): Promise<FotodeskSetting> {
        const updatedSetting = await this.dataSource.updateSettingByUserIdInDB(userId, setting);
        return new FotodeskSetting(updatedSetting.packages, updatedSetting.appSizeInGB, updatedSetting.id, updatedSetting.userId);
    }

    async deleteSetting(userId: number, id: number): Promise<void> {
        return await this.dataSource.deleteSettingByUserIdInDB(userId, id);
    }
}
