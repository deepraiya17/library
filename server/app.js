const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mySQL = require("mysql");
const BookRoutes = require("./routes/BookRoutes");
const LCHolder = require("./routes/LCHolderRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.use(cors());
app.use(morgan("combined"));
app.use("/books", BookRoutes);
app.use("/card-holder", LCHolder);
app.use("/admin", AdminRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
