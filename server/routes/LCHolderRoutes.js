const express = require("express");
const Router = express.Router();
const mySQLConnection = require("../connection");
const path = require("path");
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const saveFileAs = `${file.originalname.split(".")[0]}.jpeg`;
    cb(null, saveFileAs);
  },
});

const upload = multer({ storage: fileStorageEngine });

Router.post("/uploadPic", upload.single("image"), (req, res) => {
  res.send({ msg: "The image uploaded successfully." });
});

Router.get("/:sid", (req, res) => {
  const studentId = req.params.sid;
  const query = `SELECT * FROM lcholder where studentId='${studentId}'`;
  mySQLConnection.query(query, (err, rows, fields) => {
    if (err) res.send(err);
    else if (rows.length > 0) res.send(rows[0]);
    else res.send({ msg: "Please check your student id." });
  });
});
Router.post("/", (req, res) => {
  const { studentId, firstName, lastName, PIN } = req.body;
  const query = `INSERT INTO lcholder (studentId,firstName,lastName,PIN) 
        values ('${studentId}','${firstName}','${lastName}','${PIN}')`;
  mySQLConnection.query(query, (err, rows, fields) => {
    if (err) {
      res.send(err);
    }
    const query2 = `SELECT * FROM lcholder WHERE studentId = '${studentId}'`;
    mySQLConnection.query(query2, (err2, rows2, fields2) => {
      if (err) {
        res.send(err);
      }
      res.send(rows2[0]);
    });
  });
});

Router.get("/image/:stId", (req, res) => {
  let options = { root: path.join(__dirname, "/../images/") };
  let filename = `${req.params.stId}.jpeg`;
  res.sendFile(filename, options);
});

Router.put("/updateParticularField", (req, res) => {
  const { studentId, fieldName, fieldValue } = req.body;
  const query = `UPDATE lcholder SET ${fieldName} = '${fieldValue}' WHERE (studentId = '${studentId}')`;
  mySQLConnection.query(query, (err, rows, fields) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ msg: "Field value has been updated." });
    }
  });
});

module.exports = Router;
