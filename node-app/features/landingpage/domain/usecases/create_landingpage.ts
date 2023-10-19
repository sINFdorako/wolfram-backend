import { Landingpage } from "../entities/landingpage";
import { LandingpageRepository } from "../repositories/landingpage_repository";

export class CreateLandingpage {
    constructor(private landingpageRepository: LandingpageRepository) {}

    async execute(landingpage: Landingpage) : Promise<Landingpage> {
        return await this.landingpageRepository.createLandingpage(landingpage);
    }
}