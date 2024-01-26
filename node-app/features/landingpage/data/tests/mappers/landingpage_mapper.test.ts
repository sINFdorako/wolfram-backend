import { Landingpage } from "../../../domain/entities/landingpage";
import { landingPageEntitiyToModel, landingPageModelToEntitiy } from "../../mappers/landingpage_mapper";
import { LandingpageModel } from "../../models/landingpage.model";

describe('LandingPage Mapper', () => {
  const sampleModel = {
    id: 1,
    domainName: 'example.com',
    navTitle: 'Example',
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    googleAnalyticsTag: 'GA-1234567',
    userId: 1,
    apiKey: 'someapikey',
    heroTitle: 'Welcome!',
    heroSubTitle: 'Sub welcome',
    ctaText: 'Click me',
    meName: 'John',
    meSurname: 'Doe',
    meMainText: 'Main text',
    meNewsText: 'News text',
    contactEmail: 'example@example.com',
    contactPhone: '1234567890'
  } as unknown as LandingpageModel;

  const sampleEntity = new Landingpage({
    ...sampleModel
  });

  it('should correctly map from model to entity', () => {
    const result = landingPageModelToEntitiy(sampleModel);
    expect(result).toEqual(sampleEntity);
  });

  it('should correctly map from entity to model', () => {
    const result = landingPageEntitiyToModel(sampleEntity);
    expect(result).toEqual(sampleModel);
  });
});
