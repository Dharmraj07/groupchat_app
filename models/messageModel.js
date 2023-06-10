const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

module.exports = Message;
