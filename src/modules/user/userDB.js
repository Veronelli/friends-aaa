const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../../mysql");
sequelize.sync();

const User = sequelize.define(
  "friend",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,

    // your other configuration here
  }
);
User.beforeCreate(function (user) {
  user.password = bcrypt.hashSync(user.password, 8);
});
module.exports = User;
