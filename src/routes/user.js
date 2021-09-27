const express = require("express");
const req = require("express/lib/request");

const User = require("../modules/user/userDB");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello");
  res.json({ message: "Ok" });
});

app.post("/user", async (req, res) => {
  const user = req.body;
  await User.create(user);

  res.json({ message: "User created" }).status(200);
});

app.get("/user", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = app;
