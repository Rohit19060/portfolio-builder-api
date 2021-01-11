require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./users/users-router");
const app = express();
const authRouter = require("./auth/auth-router");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
const templateRouter = require("./templates/template-Router");

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/api/templates", templateRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "Internal server error" } };
  }
  res.status(500).json(response);
});

module.exports = app;
