const bcryptjs = require("bcryptjs");
const express = require("express");

const Token = require("./modules/token/tokenDB");
const User = require("./modules/user/userDB");
const UserRouter = require("./routes/user");
const TokenRouter = require("./routes/token");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(TokenRouter);
app.use(UserRouter);

app.listen(3000, console.log(3000));
