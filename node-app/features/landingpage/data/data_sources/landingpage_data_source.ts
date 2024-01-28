import { transformLandingPageModelToPlainObject } from "../mappers/landingpage_mapper";
import { LandingpageModel } from "../models/landingpage.model";

export class LandingpageDataSource {
    async createLandingPage(landingpageModel: LandingpageModel): Promise<LandingpageModel | null> {
        try {
            const plainLandingpage = transformLandingPageModelToPlainObject(landingpageModel);
            return await LandingpageModel.create(plainLandingpage)
        } catch (error) {
            console.error('Error creating landingpage', error);
            throw error;
        }
    }

    async updateLandingPage(landingpageModel: LandingpageModel, userId: number): Promise<LandingpageModel | null> {
        try {
             await LandingpageModel.update(landingpageModel, { where: { userId }})
             return await LandingpageModel.findOne({ where: { userId } });
        } catch (error) {
            console.error("Error updating landingpage:", error);
            throw error;
        }
    }

    async getLandingPageByUser(userId: number): Promise<LandingpageModel | null> {
        try {
            return await LandingpageModel.findOne({ where: { userId }});
        } catch (error) {
            console.error("Error getting landingpage:", error);
            throw error;
        }
    }

    async deleteLandingPageByUser(userId: number): Promise<void | null> {
        try {
            await LandingpageModel.destroy({where: {userId}});
        } catch (error) {
            console.error("Error deleting landingpage:", error);
            throw error;
        }
    }
}