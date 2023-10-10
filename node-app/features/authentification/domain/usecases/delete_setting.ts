import { FotodeskSettingRepository } from "../respositories/fotodesk_setting_repository";

export class DeleteSetting {
    constructor(private fotodeskSettingRepository: FotodeskSettingRepository) {}

    async execute(userId: number): Promise<void> {
        await this.fotodeskSettingRepository.deleteSetting(userId);
    }
}
