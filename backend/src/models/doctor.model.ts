import { DataTypes,Model } from "sequelize";
import sequelize from "../config/db";
import ReferralPatient from "./referralPatient.model";

class Doctor extends Model{
    public id!:number;
    public firstName!:string;
    public lastName!:string;
    public userType!:'OD' | 'MD';
    public email!:string;
    public password!:string;
    public isVerified!:Boolean;
    public otp!:string | null;
    public otpExpiration!:Date;

}

Doctor.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
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
        },
        isVerified:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        otp:{
            type:DataTypes.STRING,
            allowNull:true
        },
        otpExpiration:{
            type:DataTypes.DATE,
            allowNull:true
        }}

    ,{
        sequelize, tableName:'doctors'
    }
)


Doctor.hasMany(ReferralPatient, { foreignKey: 'DoctorId' });

export default Doctor;