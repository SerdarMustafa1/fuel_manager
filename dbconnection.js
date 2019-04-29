var mysql = require("");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ojaveere2019!",
  database: "Fuel_table"
});
module.exports = connection;
