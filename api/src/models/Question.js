const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    teachPoints: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    cantAnswers: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    // tagMacro: {
    //   type: DataTypes.STRING,
    //   allowNull:false
    // },
    // tagsMicro: {
    //   type: DataTypes.STRING,
    //   allowNull:false
    // },
  });
};


