const { DataTypes } = require("sequelize");
const sequelize = require("../../mysql");

const Token = sequelize.define(
  "tokens",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    updateAt: false,
  }
);

module.exports = Token;
