const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('answer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    imgs:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue:[]
    }
    // teachPoints: {
    //   type: DataTypes.INTEGER,
    //   defaultValue:0
    // },
  });
};


