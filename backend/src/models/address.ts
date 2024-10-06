

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Address extends Model {
  public id!: number;
  public userId!: number;  // Foreign key
  public companyAddress!: string;
  public companyState!: string;
  public companyCity!: string;
  public companyZip!: string;
  public homeAddress!: string;
  public homeState!: string;
  public homeCity!: string;
  public homeZip!: number;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyZip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeZip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {  // Foreign key declaration
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "addresses",
  }
);

export default Address;
