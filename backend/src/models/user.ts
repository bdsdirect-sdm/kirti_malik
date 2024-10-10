import { DataTypes, Model } from "sequelize"; 
import sequelize from "../config/db";

class User extends Model{
  public id!: number; 
  public name!: string; 
  public email!: string; 
  public password!: string; 
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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
  
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;

console.log('User model initialized successfully');