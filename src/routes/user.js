const express = require("express");
const req = require("express/lib/request");

const { Op } = require("sequelize");

const User = require("../modules/user/userDB");
const Token = require("../modules/token/tokenDB");
const auth = require("../midleware/auth");

const app = express();

const route = express.Router();

route.get("/", (req, res) => {
  console.log("Hello");
  res.json({ message: "Ok" });
});

route.get("/user", auth, async (req, res) => {
  const users = await User.findAll({
    attributes: ["firstName", "lastName", "id"],
  });
  let finalUsers = users.filter((user) => user.dataValues.id != req.user.id);
  finalUsers = finalUsers.map((user) => {
    return {
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      follow: `http:localhost:3000/user/follow/${user.dataValues.id}`,
    };
  });

  res.json(finalUsers);
});

route.get("/me/follow", auth, async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    include: [
      {
        model: User,
        as: "User2",
        attributes: ["firstName", "lastName"],
        through: { attributes: [] },
      },
    ],
    attributes: [],
  });

  console.log(user);
  res.json(user);
});

route.get("/user/me", auth, async (req, res) => {
  res.json(req.user);
});

route.get("/user/follow/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(req.user.id);
  const user2 = await User.findByPk(id);

  await user.addUser2(user2, { through: { selfGranted: false } });
  res.json({ message: "Follow!!" });
});

route.post("/user", async (req, res) => {
  const user = req.body;
  console.log(user);
  await User.create(user);

  res.json({ message: "User created" }).status(200);
});

route.post("/login", async (req, res) => {
  const user = req.body;
  res.json({ token: await User.login(user) });
});

route.put("/user/:id", async (req, res) => {
  const user = req.body;
  const { id } = req.params;

  await User.update(user, { where: { id } });

  res.json({ message: "User updated" });
});

module.exports = route;
