import { DataTypes, INTEGER, Model } from "sequelize"; 
import sequelize from "../config/db";
import User from "./user.model";
import Hobby from "./hobby.model";
import JobAgency from "./JobAgency.model";

class  JobSeeker extends Model{
  public id!: number; 
  public userId!:number;
  public firstName!:string;
  public lastName!:string;
  public email!: string; 
  public phoneNumber!:string;
  public gender!:'male' | 'femaile';
  public password!:string;
  public profile!:string;
  public resume!:string;
  public agencyId!:number;
}
JobSeeker.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId:{
         type:DataTypes.INTEGER
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
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
   },
  agencyId:{
    type:DataTypes.INTEGER,
    references:{
        model:User,
        key:'id',
    }

        
  }
  },
  {
    sequelize,
    modelName: 'JobSeeker',
  }
);

JobSeeker.hasOne(Hobby, {
  foreignKey: 'jobSeekerId',
  as: 'hobby', 
});
Hobby.belongsTo(JobSeeker, {
  foreignKey: 'jobSeekerId',
  as: 'jobSeeker',
});
JobSeeker.belongsTo(JobAgency, {
  foreignKey: 'agencyId',
  as: 'agency', 
});
JobAgency.hasMany(JobSeeker, {
  foreignKey: 'agencyId', 
  as: 'jobSeekers', 
});
export default JobSeeker;

console.log('User model initialized successfully');