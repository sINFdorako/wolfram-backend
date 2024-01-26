import { Landingpage } from "../entities/landingpage";
import { LandingpageRepository } from "../repositories/landingpage_repository";

export class UpdateLandingpage {
    constructor(private landingpageRepository: LandingpageRepository) {}

    async execute(landingPage: Landingpage, userId: number): Promise<Landingpage> {
        return await this.landingpageRepository.updateLandingpage(landingPage, userId);
    }
}