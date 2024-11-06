import { DataTypes,Model } from "sequelize";
import sequelize from "../config/db";

class Doctor extends Model{
    public id!:number;
    public firstName!:string;
    public lastName!:string;
    public userType!:'OD' | 'MD';
    public email!:string;
    public password!:string;

}

Doctor.init(
    {
        id:{
           type:DataTypes.INTEGER,
           autoIncrement:true,
           primaryKey:true
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userType:{
            type:DataTypes.ENUM('OD','MD'),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }

    },{
        sequelize, tableName:'doctors'
    }
)

export default Doctor;