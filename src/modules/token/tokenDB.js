const { DataTypes } = require("sequelize");
const sequelize = require("../../mysql");

sequelize.sync();

const Token = sequelize.define(
  "Tokens",
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
