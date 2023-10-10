import { FotodeskSetting } from '../entities/fotodesk_setting';

export interface FotodeskSettingRepository {
    getSettingById(userId: number): Promise<FotodeskSetting | null>;
    createSetting(setting: FotodeskSetting): Promise<FotodeskSetting>;
    updateSetting(userId: number, setting: FotodeskSetting): Promise<FotodeskSetting>;
    deleteSetting(userId: number): Promise<void>;
}
