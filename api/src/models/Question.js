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
      defaultValue: 300,
      get() {
        const now = Date.now()
        const created = Date.parse(this.createdAt)
        const daysOld = Math.floor((now - created) / (24  * 60 * 60 * 1000))
        const points = daysOld ? 100 * daysOld : this.getDataValue('teachPoints')
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
    imgs:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue:[]
    }
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


