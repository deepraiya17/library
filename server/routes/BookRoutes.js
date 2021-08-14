const express = require("express");
const Router = express.Router();
const mySQLConnection = require("../connection");

Router.get("/", (req, res) => {
  try {
    const query =
      "SELECT bookId, bookName, bookAuthor, genre, totalQuantity, damagedQuantity, issuedQuantity, (totalQuantity-damagedQuantity-issuedQuantity) AS availableQuantity FROM books";
    mySQLConnection.query(query, (err, rows, fields) => {
      if (err) res.send(err);
      else if (rows.length > 0) res.send(rows);
    });
  } catch (err) {
    throw err;
  }
});

Router.get("/bookId/:bookId", (req, res) => {
  try {
    const { bookId } = req.params;
    const query = `SELECT * FROM books WHERE bookId=${bookId}`;
    mySQLConnection.query(query, (err, rows, fields) => {
      if (err) res.send(err);
      else if (rows.length > 0) res.send(rows[0]);
      else res.send({ msg: "No record found" });
    });
  } catch (err) {
    res.send(err);
  }
});

Router.get("/searchByTerm", (req, res) => {
  try {
    const { searchTerm } = req.body;
    console.log(searchTerm);
    const query = `SELECT * FROM books WHERE bookName LIKE '%${searchTerm}%' OR bookAuthor LIKE '%${searchTerm}%' OR genre LIKE '%${searchTerm}%'`;
    mySQLConnection.query(query, (err, rows, fields) => {
      if (err) res.send(err);
      else if (rows.length > 0) res.send(rows);
      else res.send({ msg: "No Record Found" });
    });
  } catch (err) {
    res.send(err);
  }
});
Router.get("/searchById", (req, res) => {
  try {
    const { searchBookId } = req.body;
    const query = `SELECT * FROM books WHERE bookId LIKE '%${searchBookId}%'`;
    mySQLConnection.query(query, (err, rows, fields) => {
      if (err) res.send(err);
      else if (rows.length > 0) res.send(rows);
    });
  } catch (err) {
    res.send(err);
  }
});

Router.post("/add", (req, res) => {
  try {
    const { bookName, bookAuthor, genre, totalQuantity } = req.body;
    const query = `INSERT INTO books ( bookName, bookAuthor, genre, totalQuantity) VALUES  ('${bookName}','${bookAuthor}','${genre}','${totalQuantity}')`;
    mySQLConnection.query(query, (err, rows, fields) => {
      if (err) res.send(err);
      else res.send({ msg: "Record added successfully" });
    });
  } catch (err) {
    res.send(err);
  }
});

Router.put("/", (req, res) => {
  try {
    const { bookId, bookName, bookAuthor, genre, totalQuantity } = req.body;
    const query = `UPDATE books SET bookName = '${bookName}', bookAuthor='${bookAuthor}', genre='${genre}', totalQuantity='${totalQuantity}' WHERE bookId='${bookId}'`;
    mySQLConnection.query(query, (err, rows, fields) => {
      if (err)
        res.send({ msg: "Something went wrong. Record could not be updated" });
      else res.send({ msg: "Record updated successfully" });
    });
  } catch (err) {
    res.send({ msg: "Something went wrong. Record could not be updated" });
  }
});

module.exports = Router;
