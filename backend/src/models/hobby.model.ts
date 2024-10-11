import { DataTypes, Model, Optional } from 'sequelize';
import sequelize  from '../config/db';
import JobSeeker from './jobSeeker.model';


class Hobby extends Model{
    public id!: number;
    public jobSeekerId!: number; // Foreign key
    public sports!: boolean;
    public dance!: boolean;
    public singing!: boolean;
    public reading!: boolean;
}

Hobby.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobSeekerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: JobSeeker,
        key: 'id',
      },
    },
    sports: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    singing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    reading: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Hobbies',
  }
);

export default Hobby;
