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

    // über mich
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
        this.meName = meName;
        this.meSurname = meSurname;
        this.meMainText = meMainText;
        this.meNewsText = meNewsText;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;
    }
}
