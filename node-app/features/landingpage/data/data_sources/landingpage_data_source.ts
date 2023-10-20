import { Landingpage } from "../../domain/entities/landingpage";
import { LandingpageModel } from "../models/landingpage.model";

export class LandingpageDataSource {
    async createLandingPage(landingpage: Landingpage): Promise<Landingpage | null> {
        const landingpageModel = await LandingpageModel.create({
            domainName: landingpage.domainName,
            navTitle: landingpage.navTitle,
            primaryColor: landingpage.primaryColor,
            secondaryColor: landingpage.secondaryColor,
            googleAnalyticsTag: landingpage.googleAnalyticsTag,
            userId: landingpage.userId,
            apiKey: landingpage.apiKey,
            heroTitle: landingpage.heroTitle,
            heroSubTitle: landingpage.heroSubTitle,
            ctaText: landingpage.ctaText,
            backgroundImage: JSON.stringify(landingpage.backgroundImage), // assuming JSON storage for images
            specificGalleryPreview: JSON.stringify(landingpage.specificGalleryPreview), // same here
            meImage: JSON.stringify(landingpage.meImage), // and here
            meName: landingpage.meName,
            meSurname: landingpage.meSurname,
            meMainText: landingpage.meMainText,
            meNewsText: landingpage.meNewsText,
            contactEmail: landingpage.contactEmail,
            contactPhone: landingpage.contactPhone,
        });
    
        // If you want to return a more domain-friendly object, you might need to convert the model instance to a domain object.
        // For now, I'm just returning the model instance itself for simplicity.
        return {};
    }
    
}