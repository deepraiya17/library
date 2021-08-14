const express = require("express");
const Router = express.Router();
const mySQLConnection = require("../connection");

Router.get("/isPasswordSet", (req, res) => {
  mySQLConnection.query(`SELECT * FROM admin`, (err, rows, fields) => {
    res.send(rows.length > 0);
  });
});

Router.get("/password", (req, res) => {
  mySQLConnection.query(`SELECT * FROM admin`, (err, rows, fields) =>
    res.send(rows[0].password)
  );
});
Router.post("/password", (req, res) => {
  const isThereExistPassword = false;
  mySQLConnection.query("SELECT * FROM admin", (err, rows, fields) => {
    isThereExistPassword = !!rows[0];
  });
  if (isThereExistPassword) {
    res.status(400).send({ err: "There is already set password." });
    return;
  }
  mySQLConnection.query(
    `INSERT INTO admin (password) VALUES ('${req.body.password}')`,
    (err, rows, fields) => {
      if (err) res.status(400).send(err);
      else res.send(true);
    }
  );
});
Router.put("/password", (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const query = `UPDATE admin SET password='${newPassword}' WHERE (password = '${oldPassword}')`;
  mySQLConnection.query(query, (err, rows, fields) => {
    if (err) res.send(err);
    else res.send(true);
  });
});

module.exports = Router;
