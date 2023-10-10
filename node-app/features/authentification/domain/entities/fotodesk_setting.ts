export enum FotodeskPackage { crm, gallery, ecommerce, kanban }

export interface FotodeskSettingProps {
    packages: String[];
    appSizeInGB: number;
    id?: number;
    userId?: number;
    trialInMonths?: number | null;
    pricePerMonth?: number | null;
}
export class FotodeskSetting {
    packages: String[];
    appSizeInGB: number;
    id?: number;
    userId?: number;
    trialInMonths?: number | null;
    pricePerMonth?: number | null;

    constructor({ packages, appSizeInGB, id, userId, trialInMonths, pricePerMonth }: FotodeskSettingProps) {
        this.packages = packages;
        this.appSizeInGB = appSizeInGB;
        this.id = id;
        this.userId = userId;
        this.trialInMonths = trialInMonths;
        this.pricePerMonth = pricePerMonth;
    }
}
