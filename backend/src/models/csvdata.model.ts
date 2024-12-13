import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";


class CSVdata extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public readonly createdAt!:Date;
  public readonly updatedAt!:Date;

}

CSVdata.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  },
  {
    sequelize,
    tableName: "csvdata",
  }
);


export default CSVdata;
