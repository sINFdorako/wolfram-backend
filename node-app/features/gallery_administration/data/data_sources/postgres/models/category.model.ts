// data/data_sources/postgres/models/category.model.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../../../core/database_config/database';

export class Category extends Model {
    public id!: number;
    public userId!: number;
    public name!: string;
    public description?: string;
    public creationDate!: Date;
    public lastModifiedDate!: Date;
}

Category.init(
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
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(512),
            allowNull: true,
        },
        creationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        lastModifiedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "categories",
        sequelize: sequelize,
        // Optional: Timestamps können automatisch verwaltet werden, wenn du sie in deinem Modell aktivierst:
        timestamps: true,
        createdAt: 'creationDate',
        updatedAt: 'lastModifiedDate'
    }
);
