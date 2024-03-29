// data/data_sources/postgres/models/user.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../../../core/database_config/database';
import { UserRole } from '../../../../domain/entities/user';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public apiKey: string | undefined;
  public company!: string | null;
  public position!: string | null;
  public lastLogin!: Date | null;
  public prename!: string | null;
  public surname!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(UserRole),
      allowNull: false,
      defaultValue: UserRole.USER
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company: {
      type: new DataTypes.STRING(255),
      allowNull: true
    },
    position: {
      type: new DataTypes.STRING(255),
      allowNull: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    prename: {
      type: new DataTypes.STRING(255),
      allowNull: true
    },
    surname: {
      type: new DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    tableName: "users",
    sequelize: sequelize
  }
);
