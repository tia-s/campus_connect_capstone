const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const Match = sequelize.define("Match", {
  tutorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  matchDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  compatabilityScore: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1
    }
  },
});

module.exports = Match;
