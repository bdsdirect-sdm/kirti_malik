import { DataTypes, Model } from "sequelize"; 
import sequelize from "../config/db";

class Retailer extends Model {
  public id!: number; 
  public firstName!: string;
  public lastName!: string;
  public companyName!: string;
  public email!: string; 
  public phone!: string;
  public address!: string;
  public companyLogo!: string;
  public profileImage!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Retailer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     
  },
  {
    sequelize,
    modelName: 'Retailer',
  }
);

export default Retailer;

