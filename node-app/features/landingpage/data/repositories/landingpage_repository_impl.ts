import { Landingpage } from "../../domain/entities/landingpage";
import { LandingpageRepository } from "../../domain/repositories/landingpage_repository";
import { LandingpageDataSource } from "../data_sources/landingpage_data_source";

export class LandingpageRepositoryImpl implements LandingpageRepository {

    constructor(dataSource: LandingpageDataSource) {}
    
    createLandingpage(landingPage: Landingpage): Promise<Landingpage> {
        throw new Error("Method not implemented.");
    }
    updateLandingpage(landingPage: Landingpage): Promise<Landingpage> {
        throw new Error("Method not implemented.");
    }
    getLandingpage(userId: number): Promise<Landingpage> {
        throw new Error("Method not implemented.");
    }
    deleteLandingpage(userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}