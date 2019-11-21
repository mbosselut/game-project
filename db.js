const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5431/postgres";
const db = new Sequelize(databaseUrl);

db.sync({ force: false })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

module.exports = db;
