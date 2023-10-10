import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../../../core/database_config/database';

export class FotodeskSetting extends Model {
    public id!: number;
    public packages!: String[];
    public appSizeInGB!: number;
    public userId!: number;
    public trialInMonths!: number | null;
    public pricePerMonth!: number | null;
    public readonly updatedAt!: Date;
    public readonly createdAt!: Date;
}

FotodeskSetting.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        packages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        appSizeInGB: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        trialInMonths: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        pricePerMonth: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    },
    {
        tableName: "fotodesk_settings",
        sequelize: sequelize,
        indexes: [{
            unique: true,
            fields: ['userId']
        }]
    }
);
