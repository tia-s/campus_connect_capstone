const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize/init");

const Preference = sequelize.define("Preference", {
  auditory: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
  visual: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
  kinesthetic: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
  social: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
  solitary: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
  video: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
  phone: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
  chat: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1,
    }
  },
});

module.exports = Preference;
