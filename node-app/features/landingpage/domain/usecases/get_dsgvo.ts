import { Dsgvo } from "../entities/dsgvo";
import { DsgvoRepository } from "../repositories/dsgvo_repository";

export class GetDsgvo {
    constructor(private dsgvoRepository: DsgvoRepository) {}

    async execute(landingPageId: number): Promise<Dsgvo> {
        return await this.dsgvoRepository.getDsgvo(landingPageId);
    }
}