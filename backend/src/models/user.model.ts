import { DataTypes, Model } from "sequelize"; 
import sequelize from "../config/db";
import JobSeeker from "./jobSeeker.model";
import JobAgency from "./JobAgency.model";

class User extends Model{
  public id!: number; 
  public email!: string; 
  public password!:string
  public userType!:number
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    userType: {
      type: DataTypes.INTEGER,
      allowNull: false, // 1 for Job Seeker, 2 for Agency
    },
  
  },
  {
    sequelize,
    modelName: 'User',
  }
);

User.hasOne(JobSeeker, {
  foreignKey: 'userId',
  as: 'jobSeeker',
});
JobSeeker.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user', 
});

User.hasOne(JobAgency, {
  foreignKey: 'userId',
  as: 'agency',
});
JobAgency.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default User;

console.log('User model initialized successfully');