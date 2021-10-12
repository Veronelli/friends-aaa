const express = require("express");
const req = require("express/lib/request");

const Token = require("../modules/token/tokenDB");

const app = express();
const route = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

route.get("/token", async (req, res) => {
  console.log("Hello");
  res.json(
    await Token.findAll({
      include: "friend",
      attributes: ["token"],
    })
  );
});

module.exports = route;
