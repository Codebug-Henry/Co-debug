const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    teach_points: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    tag_macro: {
      type: DataTypes.STRING,
      allowNull:false
    },
    tags_micro: {
      type: DataTypes.STRING,
      allowNull:false
    },
  });
};


