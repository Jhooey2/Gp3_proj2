const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create Comment Model
class Rating extends Model {}

// Create fields for Comment Model
Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating_text: {
      type: DataTypes.STRING,
      validate: {
        len: [1],
      },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "dev",
            key: "rating",
        },
    },
    nondev_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "nondev",
        key: "id",
      },
    },
    dev_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dev",
          key: "id",
        },
      },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "job",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "rating",
  }
);

module.exports = Rating;