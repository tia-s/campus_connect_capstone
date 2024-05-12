const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const Tutor = sequelize.define("Tutor", {
  coursesTaken: {
    type: DataTypes.ENUM('COMP3161', 'COMP3162'),
    allowNull: false,
  },
  transcriptUpload: {
    type: DataTypes.STRING, // store url
    allowNull: false,
  },
});

module.exports = Tutor;
