import { Dsgvo } from "../entities/dsgvo";
import { DsgvoRepository } from "../repositories/dsgvo_repository";

export class UpdateDsgvo {
    constructor(private dsgvoRepository: DsgvoRepository) {}

    async execute(dsgvo: Dsgvo): Promise<Dsgvo> {
        return await this.dsgvoRepository.updateDsgvo(dsgvo);
    }
}