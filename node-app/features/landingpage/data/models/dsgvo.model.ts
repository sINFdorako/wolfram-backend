import { DataTypes, Model, Sequelize } from "sequelize";

export class DsgvoModel extends Model {
    public id!: number;
    public corporateForm?: string;
    public companyName?: string;
    public prename?: string;
    public surname?: string;
    public ustId?: string;
    public wirtschaftsId?: string;
    public registrationNumber?: string;
    public contentOwner?: string;
    public contentOwnerEmail?: string;
    public impEmail?: string;
    public impTelefon?: string;
    public dataProtectionOfficer?: string;
    public dpoEmail?: string;
    public dpoPhone?: string;
    public cookiePolicyLink?: string;
    public privacyPolicyLink?: string;
    public landingPageId?: number;
}

export const initDsgvo = (sequelize: Sequelize) => {
    DsgvoModel.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        corporateForm: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        prename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ustId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wirtschaftsId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contentOwner: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contentOwnerEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        impEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        impTelefon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dataProtectionOfficer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dpoEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dpoPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cookiePolicyLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        privacyPolicyLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        landingPageId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'Landingpages', // assuming your Landingpage model table is named Landingpages
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: "dsgvos", // The name of the table in the database
        timestamps: false, // assuming you do not need created_at and updated_at timestamps
        paranoid: false,  // not using soft deletes
    });
}
