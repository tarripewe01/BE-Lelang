const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 8000;
const MONGGODB_URL = process.env.REACT_APP_MONGODB_CONNECT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ extended: false }));
app.use(express.static(__dirname));

const productRouter = require("./routes/product");
const usersRouter = require("./routes/users");

// API
app.use("/user", usersRouter);
app.use("/product", productRouter);
app.get("/", (req, res) => {
  res.send("Welcome to ITC Finance Lelang API");
});

// Connect Monggo.DB
mongoose
  .connect(MONGGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.log(`${error} did not match`);
    // Exit process with failure
    process.exit(1);
  });
