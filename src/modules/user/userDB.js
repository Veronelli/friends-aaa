const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sequelize = require("../../mysql");
const Token = require("../token/tokenDB");

const User = sequelize.define(
  "user",
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

User.hasMany(Token);
Token.belongsTo(User);

User.beforeCreate(function (user) {
  user.password = bcrypt.hashSync(user.password, 8);
});

User.login = async function (user) {
  const a = await User.findOne({
    where: { firstName: user.firstName },
  });
  console.log(user);
  if (bcrypt.compare(user.password, a.password)) {
    const token = {};
    token.token = jwt.sign({ id: a.id }, "AAA", { expiresIn: 60 * 60 * 24 });
    token.friendId = a.id;
    await Token.create(token);
    return token.token;
  }
};

User.belongsToMany(User, {
  as: "child",
  through: "friendss",
  foreignKey: "id_user_a",
});
User.belongsToMany(User, {
  as: "parents",
  through: "friendss",
  foreignKey: "id_user_b",
});

module.exports = User;
