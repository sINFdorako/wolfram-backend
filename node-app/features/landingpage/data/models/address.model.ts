import { DataTypes, Model, Sequelize } from "sequelize";

export class LandingpageAddressModel extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public street?: string;
    public houseNumber?: string;
    public additionalInfo?: string;
    public city?: string;
    public postcode?: number;
    public stateOrProvince?: string;
    public country?: string;
    public countryCode?: string;
    public dsgvoId?: number;
}

export const initLandingpageAddress = (sequelize: Sequelize) => {
    LandingpageAddressModel.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        houseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        additionalInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postcode: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        stateOrProvince: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        countryCode: {
            type: DataTypes.STRING(2), // Assuming 2-letter country codes.
            allowNull: true,
        },
        dsgvoId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'DSGVOs', // assuming your DSGVO model table is named DSGVOs
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: "landingpageAddresses", // The name of the table in the database
        timestamps: false, // assuming you do not need created_at and updated_at timestamps
        paranoid: false,  // not using soft deletes
    });
}
