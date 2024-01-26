import { Landingpage } from "../entities/landingpage";

export interface LandingpageRepository {
     createLandingpage(landingPage: Landingpage) : Promise<Landingpage>;
     updateLandingpage(landingPage: Landingpage, userId: number): Promise<Landingpage>;
     getLandingpage(userId: number): Promise<Landingpage>;
     deleteLandingpage(userId: number) : Promise<void>;
}