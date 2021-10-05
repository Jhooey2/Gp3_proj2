const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/connection");

//  Create Dev model
class Dev extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// User model fields
Dev.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    bid_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bid",
        foreignKey: ""
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  // Set up hooks for encyryption package
  {
    hooks: {
      async beforeCreate(newDevData) {
        newDevData.password = await bcrypt.hash(newDevData.password, 10);
        return newDevData;
      },
      async beforeUpdate(updatedDevData) {
        updatedDevData.password = await bcrypt.hash(
          updatedDevData.password,
          10
        );
        return updatedDevData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "dev",
  }
);

module.exports = Dev;
