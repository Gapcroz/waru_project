const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const User = require("./models/users");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.unsubscribe(express.static(`${__dirname}/public`));

app.use(cors());
app.use(bodyParser.json());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "origin",
    "X-Api-Key",
    "x-requested-with",
    "Content-type",
    "Accept",
    "Authorization"
  );
  next();
});
// FUNCIONES
const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const emailexists = await User.exists({ email: email });
    if (emailexists) {
      return res.status(400).json({
        msg: "el correo ya existe",
      });
    } else {
      const newUser = new User({
        username: username,
        password: password,
        email: email,
      });
      const createdUser = await newUser.save();
      return res.status(201).json({
        msg: "Usuario creado",
        user: createdUser._id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// CRUD
app.post("/api/signin", function (req, res) {
  createUser(req, res);
});
// CRUD
db.connect();
const port = 3001;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
