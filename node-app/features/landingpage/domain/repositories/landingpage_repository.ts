import { Landingpage } from "../entities/landingpage";

export interface LandingpageRepository {
     createLandingpage(landingPage: Landingpage) : Promise<Landingpage| null>;
     updateLandingpage(landingPage: Landingpage, userId: number): Promise<Landingpage| null>;
     getLandingpage(userId: number): Promise<Landingpage| null>;
     deleteLandingpage(userId: number) : Promise<void| null>;
}