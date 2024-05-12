const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const CourseResource = sequelize.define("CourseResource", {
  courseID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resourceData: {
    type: DataTypes.STRING, // url
    allowNull: false,
  },
});

module.exports = CourseResource;
