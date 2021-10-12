const express = require("express");
const req = require("express/lib/request");

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
  const users = await User.findAll({ attributes: ["firstName", "lastName"] });
  res.json(users);
});

route.get("/user/me", auth, async (req, res) => {
  res.json(req.user);
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
