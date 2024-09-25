import { DataTypes,Model } from "sequelize";
import sequelize from "../config/db";



class User extends Model{
  public id!: number; 
  public first_name!: string; 
  public last_name!: string;
  public email!: string; 
  public password!: string; 
  public dob!: Date; 
  public gender!: 'male' | 'female' | 'other'; 
  public termsAndConditions!: boolean; 
    static id: any;

}

User.init(
    {
      id:{
        type:DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
          gender:{
            type:DataTypes.ENUM('male','female','other'),
            allowNull:false
          },
          termsAndConditions: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },

    },{
        sequelize,
        modelName: 'User',
      }
);
    
export default User;

console.log('56');