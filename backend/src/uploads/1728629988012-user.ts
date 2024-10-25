import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
  public id!: number; 
  public first_name!: string; 
  public last_name!: string;
  public email!: string; 
  public password!: string; 
  public termsAndConditions!: boolean; 
  public gender?: string;
  public dob?: Date;      
  public phoneNumber?: string;

 
  static id: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // It's a good idea to make email unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    termsAndConditions: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING, // Optional field
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE, // Optional field
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING, // Optional field
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;

console.log('User model initialized successfully');
