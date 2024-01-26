import { Landingpage } from "../../domain/entities/landingpage";
import { LandingpageModel } from "../models/landingpage.model";

export function landingPageModelToEntitiy(
  model: LandingpageModel
): Landingpage {
  return new Landingpage({
    id: model.id,
    domainName: model.domainName,
    navTitle: model.navTitle,
    primaryColor: model.primaryColor,
    secondaryColor: model.secondaryColor,
    googleAnalyticsTag: model.googleAnalyticsTag,
    userId: model.userId,
    apiKey: model.apiKey,
    heroTitle: model.heroTitle,
    heroSubTitle: model.heroSubTitle,
    ctaText: model.ctaText,
    meName: model.meName,
    meSurname: model.meSurname,
    meMainText: model.meMainText,
    meNewsText: model.meNewsText,
    contactEmail: model.contactEmail,
    contactPhone: model.contactPhone,
  });
}

export function landingPageEntitiyToModel(landingpage: Landingpage): any {
  return {
    id: landingpage.id,
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
    meName: landingpage.meName,
    meSurname: landingpage.meSurname,
    meMainText: landingpage.meMainText,
    meNewsText: landingpage.meNewsText,
    contactEmail: landingpage.contactEmail,
    contactPhone: landingpage.contactPhone,
  };
}

export const transformLandingPageModelToPlainObject = (
  landingpage: LandingpageModel
) => {
  return {
    id: landingpage.id,
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
    meName: landingpage.meName,
    meSurname: landingpage.meSurname,
    meMainText: landingpage.meMainText,
    meNewsText: landingpage.meNewsText,
    contactEmail: landingpage.contactEmail,
    contactPhone: landingpage.contactPhone,
  };
};
