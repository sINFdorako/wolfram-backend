import { FotodeskSettingRepository } from "../respositories/fotodesk_setting_repository";
import { FotodeskSetting } from "../entities/fotodesk_setting";

export class CreateSetting {
    constructor(private fotodeskSettingRepository: FotodeskSettingRepository) {}

    async execute(setting: FotodeskSetting): Promise<FotodeskSetting> {
        return await this.fotodeskSettingRepository.createSetting(setting);
    }
}
