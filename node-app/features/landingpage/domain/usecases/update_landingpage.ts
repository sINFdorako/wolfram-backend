import { Landingpage } from "../entities/landingpage";
import { LandingpageRepository } from "../repositories/landingpage_repository";

export class UpdateLandingpage {
    constructor(private landingpageRepository: LandingpageRepository) {}

    async execute(landingPage: Landingpage): Promise<Landingpage> {
        return await this.landingpageRepository.updateLandingpage(landingPage);
    }
}