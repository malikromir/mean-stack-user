const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const sessions = require("express-session");

mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
  console.log("Connected to db: " + config.database);
});

mongoose.connection.on("error", (err) => {
  console.log("Db error: " + error);
});

const users = require("./routes/users");

const app = express();

const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(
  sessions({ secret: config.secret, saveUninitialized: true, resave: false })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

//set Static folder for FrontEnd
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});
app.listen(port, () => {
  console.log("Server running on port " + port);
});
