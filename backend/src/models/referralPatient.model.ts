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
  public status!: string;
  public ReferredTo!: number;
  public ReferredBy!: number;
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
    MDdoctor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MedicalDocuments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "placed",
    },
 
    ReferredTo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
    },
    ReferredBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "referralpatients",
  }
);
 
Doctor.hasMany(ReferralPatient, { foreignKey: "ReferredTo"});
ReferralPatient.belongsTo(Doctor, { foreignKey: "ReferredTo" });

export default ReferralPatient;