const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const Schedule = sequelize.define("Schedule", {
  dayOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        min: 0,
        max: 6,
    }
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },

});

module.exports = Schedule;
