const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const AccountSetting = sequelize.define("AccountSetting", {
  memberID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING, // url
    allowNull: false,
  },
  emailNotifications: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  pushNotifications: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = AccountSetting;
