import { FotodeskSettingRepository } from "../respositories/fotodesk_setting_repository";
import { FotodeskSetting } from "../entities/fotodesk_setting";

export class GetSettingById {
    constructor(private fotodeskSettingRepository: FotodeskSettingRepository) {}

    async execute(userId: number): Promise<FotodeskSetting | null> {
        return await this.fotodeskSettingRepository.getSettingById(userId);
    }
}
