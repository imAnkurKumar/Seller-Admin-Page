const Sequelize = require("sequelize");

const sequelize = new Sequelize("seller-admin-page1", "root", "T#9758@QLPH", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
