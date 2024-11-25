import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";
import { referralPatientList } from "../controllers/authController";
import ReferralPatient from "./referralPatient.model";


class Message extends Model{
    public id!:number;
    public  senderId!:number;
     public  patientId!:number;
      public  recieverId!:number;
    public roomId!:string;
    public message!:string;}
   
Message.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
           autoIncrement:true,
           primaryKey:true
        },

        senderId:{
        type:DataTypes.INTEGER,
        allowNull:false},

          patientId:{
        type:DataTypes.INTEGER,
        allowNull:false,
          
        },

        recieverId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
  
        roomId:{
        type:DataTypes.STRING,
        allowNull:false
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false
        }
    
    },
     {
        sequelize, tableName:'message'
    }
)




export default Message;