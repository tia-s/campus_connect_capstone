const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");
const LessonPlan = require("./LessonPlan");

const TutorSession = sequelize.define("TutorSession", {
  tutorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  LessonPlanID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = TutorSession;
