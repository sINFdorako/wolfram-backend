export class Dsgvo {
    // Company Information
    id?: number;
    corporateForm?: string;
    companyName?: string;
    prename?: string;
    surname?: string;
    ustId?: string;
    wirtschaftsId?: string;
    registrationNumber?: string;
    contentOwner?: string;
    contentOwnerEmail?: string;

    // Contact Information
    impEmail?: string;
    impTelefon?: string;

    // Datenschutz
    dataProtectionOfficer?: string;
    dpoEmail?: string;
    dpoPhone?: string;
    cookiePolicyLink?: string;
    privacyPolicyLink?: string;

    // foreign key
    landingPageId?: number;

    constructor({
        id,
        corporateForm,
        companyName,
        prename,
        surname,
        ustId,
        wirtschaftsId,
        registrationNumber,
        contentOwner,
        contentOwnerEmail,
        impEmail,
        impTelefon,
        dataProtectionOfficer,
        dpoEmail,
        dpoPhone,
        cookiePolicyLink,
        privacyPolicyLink,
        landingPageId
    }: {
        id?: number;
        corporateForm?: string;
        companyName?: string;
        prename?: string;
        surname?: string;
        ustId?: string;
        wirtschaftsId?: string;
        registrationNumber?: string;
        contentOwner?: string;
        contentOwnerEmail?: string;
        impEmail?: string;
        impTelefon?: string;
        dataProtectionOfficer?: string;
        dpoEmail?: string;
        dpoPhone?: string;
        cookiePolicyLink?: string;
        privacyPolicyLink?: string;
        landingPageId?: number;
    }) {
        this.id = id;
        this.corporateForm = corporateForm;
        this.companyName = companyName;
        this.prename = prename;
        this.surname = surname;
        this.ustId = ustId;
        this.wirtschaftsId = wirtschaftsId;
        this.registrationNumber = registrationNumber;
        this.contentOwner = contentOwner;
        this.contentOwnerEmail = contentOwnerEmail;
        this.impEmail = impEmail;
        this.impTelefon = impTelefon;
        this.dataProtectionOfficer = dataProtectionOfficer;
        this.dpoEmail = dpoEmail;
        this.dpoPhone = dpoPhone;
        this.cookiePolicyLink = cookiePolicyLink;
        this.privacyPolicyLink = privacyPolicyLink;
        this.landingPageId = landingPageId;
    }
}