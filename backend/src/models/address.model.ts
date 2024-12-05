import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";
import Doctor from "./doctor.model";


class DoctorAddress extends Model{
  public id!:number;
  public doctorId!:number;
    public address!:string;
    public  country!:string;
     public  state!:string;
      public  city!:string;
      public pincode!:string;
 
}
   
DoctorAddress.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
           autoIncrement:true,
           primaryKey:true
        },
        doctorId:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            references:{
                model:Doctor,
                key:'id'
            }
        },

        address:{
        type:DataTypes.STRING,
        allowNull:false},

        country:{
        type:DataTypes.STRING,
        allowNull:false
      },
      state:{
        type:DataTypes.STRING,
        allowNull:false
      },
      city:{
        type:DataTypes.STRING,
        allowNull:false
      },
      pincode:{
        type:DataTypes.STRING,
        allowNull:false
      }
    
    },
     {
        sequelize, tableName:'address'
    }
)

Doctor.hasOne(DoctorAddress,{foreignKey:'doctorId'});
DoctorAddress.belongsTo(Doctor,{foreignKey:'doctorId'})


export default DoctorAddress;