import { DataTypes,DateOnlyDataType,Model } from "sequelize";
import sequelize from "../config/db";
import ReferralPatient from "./referralPatient.model";

class Appointments extends Model{
    public id!:number;
    public patientName!:string;
    public appointmentDate!:Date;
    public appointmentType!:'OD' | 'MD';
    public status!:string;
    public patientId!:number
}
Appointments.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
           autoIncrement:true,
           primaryKey:true
        },
        patientName:{
            type:DataTypes.STRING,
            allowNull:false
        },
      appointmentDate:{
        type:DataTypes.DATEONLY,
        allowNull:true
      },
        appointmentType:{
            type:DataTypes.ENUM('consultation','surgery'),
            allowNull:false
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'scheduled'
        },
        patientId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:ReferralPatient,
                key:'id'
            },
        },
    }
    ,{
        sequelize, tableName:'appointments'
    }
)

Appointments.belongsTo(ReferralPatient,{foreignKey:"patientId"})
ReferralPatient.hasMany(Appointments,{foreignKey:"patientId"})

export default Appointments;