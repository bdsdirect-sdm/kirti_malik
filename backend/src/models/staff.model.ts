import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";
import Doctor from "./doctor.model";


class Staff extends Model{
  public id!:number;
    public firstName!:string;
    public  lastName!:string;
     public  gender!:string;
      public  email!:string;
    public phoneNumber!:number;
    public doctorId!:number;
}
   
Staff.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
           autoIncrement:true,
           primaryKey:true
        },

        firstName:{
        type:DataTypes.STRING,
        allowNull:false},

        lastName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      gender:{
        type:DataTypes.STRING,
        allowNull:false
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false
      },

        phoneNumber:{
            type:DataTypes.STRING,
            allowNull:false
        },
        doctorId:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            references:{
              model:Doctor,
              key:'id'
              
            }
        }
    
    },
     {
        sequelize, tableName:'staff'
    }
)

Doctor.hasMany(Staff,{foreignKey:'doctorId'});
Staff.hasOne(Doctor,{foreignKey:'doctorId'})


export default Staff;