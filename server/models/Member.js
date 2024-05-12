const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");
// const HelpTicket = require("./HelpTicket");

const Member = sequelize.define("Member", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university: {
    type: DataTypes.ENUM('UWI', 'UTech'),
    allowNull: false,
  },
  degreeStatus: {
    type: DataTypes.ENUM('Pursuing', 'Completed'),
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
  role: {
    type: DataTypes.ENUM('Tutor', 'Student'),
    allowNull: false
  },
  identityVerification: {
    type: DataTypes.STRING, // store url
    allowNull: false
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  isMatched: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// Member.associate = (models) => {
//   User.hasOne(models.HelpTicket);
// }

module.exports = Member;

// memberID, email, phone, password, first name, last name