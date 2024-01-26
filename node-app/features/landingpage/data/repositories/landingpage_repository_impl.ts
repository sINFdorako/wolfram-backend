import { Landingpage } from "../../domain/entities/landingpage";
import { LandingpageRepository } from "../../domain/repositories/landingpage_repository";
import { LandingpageDataSource } from "../data_sources/landingpage_data_source";
import { landingPageEntitiyToModel } from "../mappers/landingpage_mapper";

export class LandingpageRepositoryImpl implements LandingpageRepository {
  private dataSource: LandingpageDataSource;

  constructor() {
    this.dataSource = new LandingpageDataSource();
  }

  async createLandingpage(landingPage: Landingpage): Promise<Landingpage> {
    const createdLandingPage = await this.dataSource.createLandingPage(
      landingPageEntitiyToModel(landingPage)
    );
    return createdLandingPage;
  }

  async updateLandingpage(
    landingPage: Landingpage,
    userId: number
  ): Promise<Landingpage> {
    const updatedLandingPage = await this.dataSource.updateLandingPage(
      landingPageEntitiyToModel(landingPage),
      userId
    );
    return updatedLandingPage;
  }

  async getLandingpage(userId: number): Promise<Landingpage> {
    const getLandingPage = await this.dataSource.getLandingPageByUser(userId);
    return getLandingPage;
  }

  async deleteLandingpage(userId: number): Promise<void> {
    await this.dataSource.deleteLandingPageByUser(userId);
  }
}
