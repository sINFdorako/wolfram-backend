// data/data_sources/postgres/models/user.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export class User extends Model {
  public id!: number; 
  public email!: string; 
  public password!: string; 
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
  },
  {
    tableName: "users",
    sequelize: sequelize
  }
);
