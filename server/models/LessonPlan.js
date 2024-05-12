const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const LessonPlan = sequelize.define("LessonPlan", {
  courseID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tutorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = LessonPlan;
