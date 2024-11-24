import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";


class Message extends Model{
    public id!:number;
    public  senderId!:number;
     public  patientId!:number;
    public roomId!:number;
    public message!:string;
    public  recieverId!:number;
}
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

        recieverId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },

        patientId:{
        type:DataTypes.INTEGER,
        allowNull:false
        },

        
        roomId:{
        type:DataTypes.INTEGER,
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