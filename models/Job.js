const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//  Create Job model
class Job extends Model {}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nondev_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "nondev",
        key: "id",
      },
    },
    dev_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "dev",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "job",
  }
);

module.exports = Job;
