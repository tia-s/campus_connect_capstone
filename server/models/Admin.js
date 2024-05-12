const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const Admin = sequelize.define("Admin", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passw: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;
