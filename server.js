const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users = require("./routes/api/users");

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.get("/", function (req, res) {
  res.render("index.html");
});

app.use("/api/users", users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
