const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    teachPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      get() {
        const now = Date.now()
        const created = Date.parse(this.createdAt)
        const points = this.getDataValue('teachPoints') + 100 * Math.floor((now - created) / (24  * 60 * 60 * 1000))
        return points;
      }
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
      defaultValue: 0
    },
    cantAnswers: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    statusValidated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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


