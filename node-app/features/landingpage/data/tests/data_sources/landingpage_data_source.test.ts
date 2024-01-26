import { Landingpage } from "../../../domain/entities/landingpage";
import { LandingpageDataSource } from "../../data_sources/landingpage_data_source";
import { landingPageEntitiyToModel } from "../../mappers/landingpage_mapper";

describe("LandingPage Data Source", () => {
  const landingPageData = new Landingpage({
    domainName: "example.com",
    navTitle: "Example",
    primaryColor: "#ffffff",
    secondaryColor: "#000000",
    googleAnalyticsTag: "GA-1234567",
    userId: 1,
    heroTitle: "Welcome!",
    heroSubTitle: "Sub welcome",
    ctaText: "Click me",
    meName: "John",
    meSurname: "Doe",
    meMainText: "Main text",
    meNewsText: "News text",
    contactEmail: "example@example.com",
    contactPhone: "1234567890",
  });

  it("should create landingpage in database", async () => {
    // Arrange
    const dataSource = new LandingpageDataSource();

    const mappedLandingpageToModel = landingPageEntitiyToModel(landingPageData);

    // Act
    const createdLandingPage = await dataSource.createLandingPage(
      mappedLandingpageToModel
    );

    // Assert
    expect(createdLandingPage).toBeDefined();
    expect(createdLandingPage!.id).toBeDefined();
  });

  it("should update landingpage in database", async () => {
    // Arrange
    const dataSource = new LandingpageDataSource();

    const createdLandingPage = await dataSource.createLandingPage(
      landingPageEntitiyToModel(landingPageData)
    );

    const landingPageUpdateData = new Landingpage({
      id: createdLandingPage.id,
      navTitle: "new Title",
      heroTitle: "new Hero Title",
    });

    // Act
    const updatedLandingPage = await dataSource.updateLandingPage(
      landingPageEntitiyToModel(landingPageUpdateData),
      1
    );

    // Assert
    expect(updatedLandingPage).toBeDefined();
    expect(updatedLandingPage!.id).toEqual(createdLandingPage.id);
    expect(updatedLandingPage!.navTitle).toEqual("new Title");
    expect(updatedLandingPage!.heroTitle).toEqual("new Hero Title");
  });

  it("should get landingpage by user id from the database", async () => {
    /* Goal is here to get landingpage of first test */

    // Arrange
    const dataSource = new LandingpageDataSource();

    // Act
    const userLandingPage = await dataSource.getLandingPageByUser(1);

    // Assert
    expect(userLandingPage!.navTitle).toEqual("Example");
  });

  it("should delete landingpage from user", async () => {
    // Arrange
    const dataSource = new LandingpageDataSource();

    // Act
    await dataSource.deleteLandingPageByUser(1);

    // Assert
    const deletedLandingPage = await dataSource.getLandingPageByUser(1);
    expect(deletedLandingPage).toBeNull();
  });
});
