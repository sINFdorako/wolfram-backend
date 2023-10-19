import { DsgvoRepository } from "../repositories/dsgvo_repository";

export class DeleteDsgvo {
    constructor(private dsgvoRepository: DsgvoRepository) {}

    async execute(landingpageId: number): Promise<void> {
         await this.dsgvoRepository.deleteDsgvo(landingpageId);
    }
}