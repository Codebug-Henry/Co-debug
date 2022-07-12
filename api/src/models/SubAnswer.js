const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("subAnswer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};