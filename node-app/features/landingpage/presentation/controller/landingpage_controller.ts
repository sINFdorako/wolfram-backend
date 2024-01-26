import { Landingpage } from "../../domain/entities/landingpage";
import { UpdateLandingpage } from "../../domain/usecases/update_landingpage";
import { GetLandingpage } from "../../domain/usecases/get_landingpage";
import { DeleteLandingpage } from "../../domain/usecases/delete_landingpage";
import { CreateLandingpage } from "../../domain/usecases/create_landingpage";
import { Request, Response } from "express";

export class LandingpageController {
    constructor(
        private createLandingpage: CreateLandingpage, 
        private updateLandingpage: UpdateLandingpage, 
        private getLandingpage: GetLandingpage, 
        private deleteLandingpage: DeleteLandingpage
    ) {}

    create = async (req: Request, res: Response) => {
        try {
            const {
                domainName, navTitle, primaryColor, secondaryColor, googleAnalyticsTag, userId, id, apiKey, heroTitle, heroSubTitle,
                ctaText, meName, meSurname, meMainText, meNewsText, contactEmail, contactPhone
            } = req.body;

            const landingpage = new Landingpage({
                domainName: domainName,
                navTitle: navTitle,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                googleAnalyticsTag: googleAnalyticsTag,
                userId: userId,
                id: id,
                apiKey: apiKey,
                heroTitle: heroTitle,
                heroSubTitle: heroSubTitle,
                ctaText: ctaText,
                meName: meName,
                meSurname: meSurname,
                meMainText: meMainText,
                meNewsText: meNewsText,
                contactEmail: contactEmail,
                contactPhone: contactPhone
            });

            const result = await this.createLandingpage.execute(landingpage);

            res.status(200).send(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred during creating the Landingpage' });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const {
                domainName, navTitle, primaryColor, secondaryColor, googleAnalyticsTag, userId, id, apiKey, heroTitle, heroSubTitle,
                ctaText, meName, meSurname, meMainText, meNewsText, contactEmail, contactPhone
            } = req.body;

            const landingpage = new Landingpage({
                domainName: domainName,
                navTitle: navTitle,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                googleAnalyticsTag: googleAnalyticsTag,
                userId: userId,
                id: id,
                apiKey: apiKey,
                heroTitle: heroTitle,
                heroSubTitle: heroSubTitle,
                ctaText: ctaText,
                meName: meName,
                meSurname: meSurname,
                meMainText: meMainText,
                meNewsText: meNewsText,
                contactEmail: contactEmail,
                contactPhone: contactPhone
            });

            const result = await this.updateLandingpage.execute(landingpage, );

            res.status(200).send(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred during updating the Landingpage' });
        }
    }

    get = async(req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);
            const landingpage = await this.getLandingpage.execute(userId);

            res.status(200).send(landingpage);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to get Landingpage' });
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);
            
            await this.deleteLandingpage.execute(userId);

            res.status(204).send();
            
        } catch(error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to delete Landingpage' });
        }
    }
}
