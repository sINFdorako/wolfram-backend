import { FotodeskSettingRepository } from "../respositories/fotodesk_setting_repository";
import { FotodeskSetting } from "../entities/fotodesk_setting";

export class UpdateSetting {
    constructor(private fotodeskSettingRepository: FotodeskSettingRepository) {}

    async execute(userId: number, setting: FotodeskSetting): Promise<FotodeskSetting> {
        return await this.fotodeskSettingRepository.updateSetting(userId, setting);
    }
}