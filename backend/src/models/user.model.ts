import { DataTypes, Model } from "sequelize"; 
import sequelize from "../config/db";

class User extends Model {
  public id!: number; 
  public firstName!: string;
  public lastName!: string;
  public email!: string; 
  public phone!: string;
  public gender!: string;
  public userType!: string;
  public profileImage!: string;
  public resume?: string;
  public password!: string;
  public agencyId?: number;
  public hobbies?: string[]; // Added hobbies as an array of strings

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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agencyId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hobbies: { 
      type: DataTypes.JSON, 
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;

