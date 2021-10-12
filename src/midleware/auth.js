const jwt = require("jsonwebtoken");
const User = require("../modules/user/userDB");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.bearer;
    console.log(token);
    const decoded = await jwt.verify(token, "AAA");
    const userDB = await User.findByPk(decoded.id);

    if (!userDB) throw new Error();

    const user = await userDB.dataValues;
    delete user.password;
    req.user = user;
    console.log(user);

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
