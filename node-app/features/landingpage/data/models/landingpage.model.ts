import { DataTypes, Model, Sequelize } from "sequelize";

export class LandingpageModel extends Model {
    public id!: number;
    public domainName?: string;
    public navTitle?: string;
    public primaryColor?: string;
    public secondaryColor?: string;
    public googleAnalyticsTag?: string;
    public userId?: number;
    public apiKey?: string;
    public heroTitle?: string;
    public heroSubTitle?: string;
    public ctaText?: string;
    public backgroundImage?: string; // Storing as JSON string
    public specificGalleryPreview?: string; // Storing as JSON string
    public meImage?: string; // Storing as JSON string
    public meName?: string;
    public meSurname?: string;
    public meMainText?: string;
    public meNewsText?: string;
    public contactEmail?: string;
    public contactPhone?: string;
}

export const initLandingpage = (sequelize: Sequelize) => {
    LandingpageModel.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        domainName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        navTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        primaryColor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        secondaryColor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleAnalyticsTag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        apiKey: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        heroTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        heroSubTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ctaText: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        backgroundImage: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        specificGalleryPreview: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        meImage: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        meName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        meSurname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        meMainText: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        meNewsText: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "landingpages", 
        timestamps: false, // assuming you do not need created_at and updated_at timestamps
        paranoid: false,  // not using soft deletes
    });
}
