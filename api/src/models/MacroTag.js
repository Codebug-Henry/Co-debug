const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('macroTag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    tag: {
      type: DataTypes.STRING,
      allowNull:false,
    }
  });
};


