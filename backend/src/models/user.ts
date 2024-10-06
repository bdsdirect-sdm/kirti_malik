import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Address from "./address"; // Import Address model

console.log("User model file is being loaded");

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public profilePhoto!: string;
  public email!: string; // Adding email field to the class
  public address?: Address;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', 
  }
);


User.hasOne(Address, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'address', // Add alias
});

Address.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user', // Add alias (optional if needed)
});

export default User;


