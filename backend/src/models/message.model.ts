import { DataTypes, Model } from "sequelize"; 
import sequelize from "../config/db";


class Message extends Model {
     public messageId!:number;
     public senderId!:number;
     public recieverId!:number;
     public messageContent!:number;
     public timeStamp!:Date;
}

Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    recieverId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    messageContent:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    timeStamp:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    }
   
   
  },
  {
    sequelize,
    modelName: 'Message',
  }
);

export default Message;

