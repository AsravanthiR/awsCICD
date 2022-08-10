var createError = require("http-errors");
// we are importing the express package
const express = require("express");
// this line imports the path
const path = require("path");

// these packages will aid in application routing
const homePageRouter = require("./routes/home");
const studentEngineeringRouter = require("./routes/engineering-education");

//these packages are used to parse cookie values
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// the following lines are used to setup view templates for our application
// you can also set views of your choice here.

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// we directing the application of which pages to use
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/home", homePageRouter);
app.use("/engineering-education", studentEngineeringRouter);

// this method catches error Not Found
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
