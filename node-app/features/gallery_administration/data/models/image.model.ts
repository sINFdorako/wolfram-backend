// data/data_sources/postgres/models/image.model.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../core/database_config/database';
import { ImageType } from '../../domain/entities/image';

export class ImageModel extends Model {
    public id!: number;
    public userId!: number;
    public categoryId!: number;
    public url!: string;
    public filename!: string;
    public originalFilename!: string;
    public fileSize!: number;
    public mimeType!: string;
    public title?: string;
    public description?: string;
    public uploadDate!: Date;
    public lastModifiedDate!: Date;
    public tags?: string[];

    // EXIF-Daten
    public cameraMake?: string;
    public cameraModel?: string;
    public exposureTime?: number;
    public aperture?: number;
    public iso?: number;
    public focalLength?: number;
    public flashUsed?: boolean;

    // IPTC-Daten
    public creator?: string;
    public copyright?: string;
    public creationDate?: Date;

    //foreign key landingpage
    public landingpageId?: number;
    public imageType?: ImageType;
}

ImageModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        url: {
            type: new DataTypes.STRING(1024),
            allowNull: false,
        },
        filename: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        originalFilename: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        fileSize: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        mimeType: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        title: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: new DataTypes.STRING(512),
            allowNull: true,
        },
        uploadDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        lastModifiedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        cameraMake: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        cameraModel: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        exposureTime: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        aperture: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        iso: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        focalLength: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        flashUsed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        creator: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        copyright: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        creationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        landingpageId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true, // An image may not always be associated with a landing page.
            references: { // This is the association part
                model: 'landingpages', // name of the target table
                key: 'id', // key in the target model that the foreign key column is referencing
            },
        },
        imageType: {
            type: DataTypes.ENUM,
            values: Object.values(ImageType),
            allowNull: true,
        },
    },
    {
        tableName: "images",
        sequelize: sequelize,
        timestamps: true,
        createdAt: 'uploadDate',
        updatedAt: 'lastModifiedDate'
    }
);
