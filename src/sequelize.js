const Sequelize = require("sequelize");

const sequelize = new Sequelize("friends", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado");
  })
  .catch((err) => {
    console.log("No se conecto");
  });

sequelize.sync({ force: false });
module.exports = sequelize;
