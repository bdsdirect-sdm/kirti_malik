import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Doctor from "./doctor.model";

class ReferralPatient extends Model {
  public id!: number;
  public dob!: Date;
  public email!: string;
  public phoneNumber!: string;
  public firstName!: string;
  public lastName!: string;
  public gender!: string;
  public diseaseName!: string;
  public laterality!: string;
  public returnPatient!: string;
  public MDdoctor!: string;
  public MedicalDocuments!: string;
  public status!: "pending"| "scheduled"| "completed"| "cancelled";
  public referredTo!: number;
  public referredBy!: number;
}

ReferralPatient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    laterality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    returnPatient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MedicalDocuments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
     type: DataTypes.ENUM("pending", "scheduled", "completed", "cancelled"),
  allowNull: false,
  defaultValue: "pending",
     
    },
 
    referredTo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
    },
    referredBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    
    },
  },
  {
    sequelize,
    tableName: "referralpatients",
  }
);
 
Doctor.hasMany(ReferralPatient, { foreignKey: "referredTo"});
ReferralPatient.belongsTo(Doctor, { foreignKey: "referredTo" });

export default ReferralPatient;