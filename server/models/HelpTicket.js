// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/sequelize/init");
// const User = require("./User");

// const HelpTicket = sequelize.define("HelpTicket", {
//   issue: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   },
//   resolved: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false
//   },
//   memberID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Users',
//       key: 'id'
//     },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE'
//   },
// });

// HelpTicket.associate = (models) => {
//   HelpTicket.belongsTo(models.Member, {foreignKey: "id", as: "memberID"});
// }

// module.exports = HelpTicket;
