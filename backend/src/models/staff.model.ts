import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";


class Staff extends Model{
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
            type:DataTypes.NUMBER,
            allowNull:false
        }
    
    },
     {
        sequelize, tableName:'staff'
    }
)




export default Staff;