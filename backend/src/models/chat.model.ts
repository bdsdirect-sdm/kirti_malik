import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";
import ReferralPatient from "./referralPatient.model";
import Doctor from "./doctor.model";

class Chat extends Model{
    public id!:number;
    public roomId!:number;
    public message!:string;
    public senderId!:number;
}
Chat.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
           autoIncrement:true,
           primaryKey:true
        },
      roomId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
        message:{
            type:DataTypes.STRING,
            allowNull:false
        },
        senderId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Doctor,
                key:'id'
            },
        },  
    }
    ,{
        sequelize, tableName:'appointments'
    }
)

Doctor.hasMany(Chat,{foreignKey:'senderId'});
Chat.belongsTo(Doctor,{foreignKey:'senderId'})



export default Chat;