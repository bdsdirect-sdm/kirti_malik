import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Retailer from "./retailer.model";

class Product extends Model {
  public id!: number;
  public name!: string;
  public image!: string;
  public quantity!: number;
  public price!: number;
  public status!: string;
  public retailerId!: number; 
  public deleted!:boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'draft', // Default to draft
    },
    deleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    retailerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Retailer,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

export default Product;
