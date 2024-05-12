const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const Course = sequelize.define("Course", {
  courseID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Course;
