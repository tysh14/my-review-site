const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "GreenTacos5674##",
  host: "localhost",
  port: 5432,
  database: "myreviewsite",
});

module.exports = pool;
