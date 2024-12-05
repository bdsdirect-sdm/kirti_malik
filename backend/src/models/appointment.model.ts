import { DataTypes,DateOnlyDataType,HasMany,Model } from "sequelize";
import sequelize from "../config/db";
import ReferralPatient from "./referralPatient.model";
import Doctor from "./doctor.model";

class Appointments extends Model{
    public id!:number;
    public appointmentDate!:Date;
    public appointmentType!:'consultation' | 'surgery';
    public patientId!:number;
     public status!: 'pending' |'scheduled' | 'completed ' | 'cancelled';

    public doctor!:number
}
Appointments.init(
    {
        id:{
           type:DataTypes.INTEGER.UNSIGNED,
           autoIncrement:true,
           primaryKey:true
        },
      appointmentDate:{
        type:DataTypes.DATEONLY,
        allowNull:true
      },
        appointmentType:{
            type:DataTypes.ENUM('consultation','surgery'),
            allowNull:false
        },
        patientId:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            references:{
                model:ReferralPatient,
                key:'id'
            },
        },
        doctor:{
          type:DataTypes.INTEGER.UNSIGNED,
          allowNull:false,
          references:{
            model:Doctor,
            key:'id'
          }
        },
          status: {
      type: DataTypes.ENUM('pending','scheduled','completed', 'cancelled'),
      defaultValue: "pending",
    },

    }
    ,{
        sequelize, tableName:'appointments'
    }
)

Doctor.hasMany(Appointments,{foreignKey:"doctor"})
Appointments.belongsTo(Doctor,{foreignKey:"doctor"})


Appointments.belongsTo(ReferralPatient,{foreignKey:"patientId"})
ReferralPatient.hasOne(Appointments,{foreignKey:"patientId"})

export default Appointments;