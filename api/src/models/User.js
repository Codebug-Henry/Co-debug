const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    sub: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameChanges: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locale: {
      type: DataTypes.STRING,
    },
    myTeachPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    picture: {
      type: DataTypes.TEXT,
      defaultValue: "imgvacia",
    },
    statusAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    statusBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    favourites: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    cantFav: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cantQuest: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cantAns: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    questLiked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    questDisliked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    ansLiked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    ansDisliked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
  });
};
