const mySQL = require("mysql");
let mySQLConnection = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "library",
  port: 3306,
});
mySQLConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err);
  }
});
module.exports = mySQLConnection;
