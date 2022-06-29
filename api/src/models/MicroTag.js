const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('microTag', {
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
