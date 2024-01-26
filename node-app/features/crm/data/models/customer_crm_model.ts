import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../core/database_config/database'; // Adjust the path as needed

export class CustomerCRM extends Model {
 public id?: number;
 public userId?: number;
 public gender?: string;
 public academicTitle?: string;
 public customerId?: string;
 public firstName!: string;
 public lastName?: string;
 public companyName?: string;
 public position?: string;
 public email?: string;
 public landline?: string;
 public phone?: string;
 public website?: string;
 public instagram?: string;
 public facebook?: string;
 public tiktok?: string;
 public street?: string;
 public houseNumber?: string;
 public postalCode?: string;
 public city?: string;
 public state?: string;
 public country?: string;
 public birthDate?: Date;
 public lifecyclePosition?: string;
 public numberOfBookings?: number;
 public lastAppointment?: Date;
 public totalRevenue?: number;
 public outstandingInvoices?: number;
 public customerDiscount?: number;
 public newsletterSubscribed?: boolean;

 public readonly createdAt!: Date;
 public readonly updatedAt!: Date;
}

CustomerCRM.init(
 {
id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
},
userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: 'users',
        key: 'id',
    }
},
 gender: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 academicTitle: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 customerId: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 firstName: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 lastName: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 companyName: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 position: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 email: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 landline: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 phone: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 website: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 instagram: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 facebook: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 tiktok: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 street: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 houseNumber: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 postalCode: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 city: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 state: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 country: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 birthDate: {
   type: DataTypes.DATE,
   allowNull: true,
 },
 lifecyclePosition: {
   type: DataTypes.STRING,
   allowNull: true,
 },
 numberOfBookings: {
   type: DataTypes.INTEGER,
   allowNull: true,
 },
 lastAppointment: {
   type: DataTypes.DATE,
   allowNull: true,
 },
 totalRevenue: {
   type: DataTypes.DOUBLE,
   allowNull: true,
 },
 outstandingInvoices: {
   type: DataTypes.INTEGER,
   allowNull: true,
 },
 customerDiscount: {
   type: DataTypes.DOUBLE,
   allowNull: true,
 },
 newsletterSubscribed: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
 },
 },
 {
 tableName: "customers",
 sequelize: sequelize,
 }
);
