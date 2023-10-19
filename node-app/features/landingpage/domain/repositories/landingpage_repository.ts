import { Landingpage } from "../entities/landingpage";

export interface LandingpageRepository {
     createLandingpage(landingPage: Landingpage) : Promise<Landingpage>;
     updateLandingpage(landingPage: Landingpage): Promise<Landingpage>;
     getLandingpage(userId: number): Promise<Landingpage>;
     deleteLandingpage(userId: number) : Promise<void>;
}