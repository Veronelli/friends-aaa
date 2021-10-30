const bcryptjs = require("bcryptjs");
const express = require("express");

const Token = require("./modules/token/tokenDB");
const User = require("./modules/user/userDB");
const UserRouter = require("./routes/userRouter");
const TokenRouter = require("./routes/tokenRouter");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(TokenRouter);
app.use(UserRouter);

app.listen(3000, console.log(3000));
