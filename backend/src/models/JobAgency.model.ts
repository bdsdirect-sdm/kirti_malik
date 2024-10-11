import { DataTypes, Model } from "sequelize"; 
import sequelize from "../config/db";

class  JobAgency extends Model{
  public id!: number; 
  public userId!:number;
  public name!:string;
  public email!: string; 
  public password!:string;
  public phoneNumber!:string;
 public agencyName!:string;
 public agencyAddress!:string;
 
}
JobAgency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId:{
         type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
  
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender:{
        type:DataTypes.ENUM('male','female')
    },
   resume:{
    type:DataTypes.STRING,
    allowNull:false
   },
   profile:{
    type:DataTypes.STRING,
    allowNull:false
   }
  
  },
  {
    sequelize,
    modelName: 'JobSeeker',
  }
);

export default JobAgency;

console.log('User model initialized successfully');