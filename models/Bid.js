const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//  Create Bid model
class Bid extends Model {}

Bid.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "job",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "bid",
  }
);

module.exports = Bid;
