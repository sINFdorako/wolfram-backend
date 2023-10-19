import Image from "../../../gallery_administration/domain/entities/image";

export class Landingpage {
    // custom domain
    domainName?: string;

    // generall
    navTitle?: string;
    primaryColor?: string;
    secondaryColor?: string;
    googleAnalyticsTag?: string;
    userId?: number;
    id?: number;
    apiKey?: string;

    // hero
    heroTitle?: string;
    heroSubTitle?: string;
    ctaText?: string;
    backgroundImage?: Image[];

    // galerie vorschau
    specificGalleryPreview?: Image[];

    // über mich
    meImage?: Image;
    meName?: string;
    meSurname?: string;
    meMainText?: string;
    meNewsText?: string;

    // kontakt
    contactEmail?: string;
    contactPhone?: string;

    constructor({
        domainName,
        navTitle,
        primaryColor,
        secondaryColor,
        googleAnalyticsTag,
        userId,
        id,
        apiKey,
        heroTitle,
        heroSubTitle,
        ctaText,
        backgroundImage,
        specificGalleryPreview,
        meImage,
        meName,
        meSurname,
        meMainText,
        meNewsText,
        contactEmail,
        contactPhone,
    }: {
        domainName?: string;
        navTitle?: string;
        primaryColor?: string;
        secondaryColor?: string;
        googleAnalyticsTag?: string;
        userId?: number;
        id?: number;
        apiKey?: string;
        heroTitle?: string;
        heroSubTitle?: string;
        ctaText?: string;
        backgroundImage?: Image[];
        specificGalleryPreview?: Image[];
        meImage?: Image;
        meName?: string;
        meSurname?: string;
        meMainText?: string;
        meNewsText?: string;
        contactEmail?: string;
        contactPhone?: string;
    }) {
        this.domainName = domainName;
        this.navTitle = navTitle;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.googleAnalyticsTag = googleAnalyticsTag;
        this.userId = userId;
        this.id = id;
        this.apiKey = apiKey;
        this.heroTitle = heroTitle;
        this.heroSubTitle = heroSubTitle;
        this.ctaText = ctaText;
        this.backgroundImage = backgroundImage;
        this.specificGalleryPreview = specificGalleryPreview;
        this.meImage = meImage;
        this.meName = meName;
        this.meSurname = meSurname;
        this.meMainText = meMainText;
        this.meNewsText = meNewsText;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;
    }
}
