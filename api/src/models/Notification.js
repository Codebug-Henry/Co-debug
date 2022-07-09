const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("notification", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subCreator: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questId: {
      type: DataTypes.INTEGER,
    },
    statusRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
};