const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const Student = sequelize.define("Student", {
  memberID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.ENUM('COMP3161', 'COMP3162'),
    allowNull: false,
  }
});

module.exports = Student;

