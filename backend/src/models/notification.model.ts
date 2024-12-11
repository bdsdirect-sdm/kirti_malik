import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";


class Notification extends Model{
    public id!:number;
    public  senderId!:number;
     public  patientId!:number;
      public  recieverId!:number;
    public message!:string;}
   
Notification.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
           autoIncrement:true,
           primaryKey:true
        },

        senderId:{
        type:DataTypes.INTEGER,
        allowNull:false},

        recieverId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      patientId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },

        message:{
            type:DataTypes.STRING,
            allowNull:false
        },
        isRead:{
          type:DataTypes.BOOLEAN,
          allowNull:false,
          defaultValue:false
        }
    
    },
     {
        sequelize, tableName:'notification'
    }
)




export default Notification;