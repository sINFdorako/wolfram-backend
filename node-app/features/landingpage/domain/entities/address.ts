export class LandingpageAddress {
    id?: number;
    street?: string;
    houseNumber?: string;       
    additionalInfo?: string;    // Zusätzliche Informationen wie Stockwerk, Wohnungsnr. etc.
    city?: string;              
    postcode?: number;
    stateOrProvince?: string;   // Bundesland oder Provinz, je nach Land
    country?: string;
    countryCode?: string;       // Ländercode, z. B. "DE" für Deutschland

    // foreign key
    dsgvoId?: number;

    constructor({
        id,
        street,
        houseNumber,
        additionalInfo,
        city,
        postcode,
        stateOrProvince,
        country,
        countryCode,
        dsgvoId
    }: {
        id?: number;
        street?: string;
        houseNumber?: string;
        additionalInfo?: string;
        city?: string;
        postcode?: number;
        stateOrProvince?: string;
        country?: string;
        countryCode?: string;
        dsgvoId?: number;
    }) {
        this.id = id;
        this.street = street;
        this.houseNumber = houseNumber;
        this.additionalInfo = additionalInfo;
        this.city = city;
        this.postcode = postcode;
        this.stateOrProvince = stateOrProvince;
        this.country = country;
        this.countryCode = countryCode;
        this.dsgvoId = dsgvoId;
    }
}
