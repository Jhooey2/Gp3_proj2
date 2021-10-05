const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/connection");

//  Create NonDev model
class NonDev extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// User model fields
NonDev.init(
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
    company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  // Set up hooks for encyryption package
  {
    hooks: {
      async beforeCreate(newNonDevData) {
        newNonDevData.password = await bcrypt.hash(newNonDevData.password, 10);
        return newNonDevData;
      },
      async beforeUpdate(updatedNonDevData) {
        updatedNonDevData.password = await bcrypt.hash(
          updatedNonDevData.password,
          10
        );
        return updatedNonDevData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "nondev",
  }
);

module.exports = NonDev;
