import { Landingpage } from "../entities/landingpage";
import { LandingpageRepository } from "../repositories/landingpage_repository";

export class GetLandingpage {
    constructor(private landingpageRepository: LandingpageRepository) {}

    async execute(userId: number): Promise<Landingpage | null> {
        return await this.landingpageRepository.getLandingpage(userId);
    }
}