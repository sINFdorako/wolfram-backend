import { LandingpageRepository } from "../repositories/landingpage_repository";

export class DeleteLandingpage {
    constructor(private landingpageRepository: LandingpageRepository) {}

    async execute(userId: number): Promise<void| null> {
         await this.landingpageRepository.deleteLandingpage(userId);
    }
}