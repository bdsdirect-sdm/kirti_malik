// models/Message.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Message extends Model {
   public message_id!: number;
   public sender_id!: number;
   public receiver_id!: number;
   public message_content!: string;
   public timestamp!: Date;
}

Message.init(
   {
      message_id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      sender_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      receiver_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      message_content: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      timestamp: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
   },
   {
      sequelize,
      modelName: 'Message',
   }
);

export default Message;
