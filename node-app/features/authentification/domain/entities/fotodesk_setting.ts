export enum FotodeskPackage { crm, gallery, ecommerce, kanban }

export class FotodeskSetting {
    packages: String[];
    appSizeInGB: number;
    id?: number;
    userId?: number;

    constructor(packages: String[], appSizeInGB: number, id?: number, userId?: number) {
        this.packages = packages;
        this.appSizeInGB = appSizeInGB;
        this.id = id;
        this.userId = userId;
    }
}
