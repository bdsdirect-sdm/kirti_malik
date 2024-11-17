import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import ReferralPatient from "./referralPatient.model";

class Appointment extends Model {
  public id!: number;
  public patientId!: number;
  public appointmentDate!: Date;
  public type!: string;
  public consultNote!:string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: ReferralPatient,
        key: "id",
      },
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    consultNote:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    type: {
      type: DataTypes.ENUM("consultation", "surgery"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appointments",
  }
);


ReferralPatient.hasMany(Appointment, { foreignKey: "patientId" });
Appointment.belongsTo(ReferralPatient, { foreignKey: "patientId" });

export default Appointment;
