const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('alert', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subCreator: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statusResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
};